import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Note, User } from './types';
import { noteApi } from './services/noteService';
import AuthPage from './pages/AuthPage';
import NoteFormModal from './components/NoteFormModal';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import ProfileModal from './components/ProfileModal';

export type ActiveFilter = { type: 'SPECIAL' | 'FOLDER' | 'TAG'; value: string };
export type Theme = 'light' | 'dark';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [activeFilter, setActiveFilter] = useState<ActiveFilter>({ type: 'SPECIAL', value: 'All Snippets' });
    const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('devnotes_theme') as Theme) || 'dark');

     useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
        localStorage.setItem('devnotes_theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    const checkAuthStatus = useCallback(async () => {
        setIsAuthLoading(true);
        try {
            const user = await noteApi.getCurrentUser();
            setIsAuthenticated(!!user);
            setCurrentUser(user);
        } catch (error) {
            setIsAuthenticated(false);
            setCurrentUser(null);
        } finally {
            setIsAuthLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    // FETCH NOTES
    // NOTE: fetchNotes should NOT depend on activeNoteId to avoid re-creating the callback
    const fetchNotes = useCallback(async () => {
        if (!isAuthenticated) return;
        setIsLoading(true);
        try {
            const data = await noteApi.getNotes();
            const sortedData = data.sort((a: Note, b: Note) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setNotes(sortedData);

            // Use functional update to decide whether to change activeNoteId safely
            setActiveNoteId(prev => {
                if (sortedData.length === 0) return null;
                // if previously selected id still exists, keep it
                if (prev && sortedData.some(n => n._id === prev)) return prev;
                // otherwise select first
                return sortedData[0]._id;
            });

        } catch (err) {
            console.error("Failed to fetch notes:", err);
            // If fetching fails due to auth, log out user
            try { await handleLogout(); } catch {}
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated]); // <-- only depends on isAuthenticated

    useEffect(() => {
        fetchNotes();
    }, [isAuthenticated, fetchNotes]);

    const filteredNotes = useMemo(() => {
        let notesToShow = [...notes]; 

        if (activeFilter.type === 'FOLDER') {
            notesToShow = notesToShow.filter(n => n.category === activeFilter.value);
        } else if (activeFilter.type === 'TAG') {
            notesToShow = notesToShow.filter(n => n.tags.includes(activeFilter.value));
        } else if (activeFilter.type === 'SPECIAL' && activeFilter.value === 'Uncategorized') {
            notesToShow = notesToShow.filter(n => !n.category || n.category.trim() === '');
        }

        if (searchTerm) {
            const search = searchTerm.toLowerCase();
            notesToShow = notesToShow.filter(note => 
                (note.title || '').toLowerCase().includes(search) ||
                (note.content || '').toLowerCase().includes(search) ||
                (note.tags || []).some((t: string) => t.toLowerCase().includes(search)) ||
                ((note.code || '')).toLowerCase().includes(search)
            );
        }
        return notesToShow;
    }, [notes, activeFilter, searchTerm]);
    
    // SAFELY sync activeNoteId to filteredNotes
    // Only watch filteredNotes. Do not watch activeNoteId here to avoid loops.
    useEffect(() => {
        if (filteredNotes.length > 0) {
            // If current active note is not present, select first visible note
            if (!filteredNotes.some(n => n._id === activeNoteId)) {
                setActiveNoteId(filteredNotes[0]._id);
            }
        } else {
            // If there are no notes in this filter, set to null only if not already null
            if (activeNoteId !== null) {
                setActiveNoteId(null);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredNotes]); // intentionally only filteredNotes

    const activeNote = useMemo(() => {
        return notes.find(note => note._id === activeNoteId) || null;
    }, [notes, activeNoteId]);

    const handleCreateNew = () => {
        setEditingNote(null);
        setIsFormModalOpen(true);
    };

    const handleEdit = (note: Note) => {
        setEditingNote(note);
        setIsFormModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            await noteApi.deleteNote(id);
            if (activeNoteId === id) {
               setActiveNoteId(null); 
            }
            fetchNotes();
        }
    };

    const handleFormSubmit = async (noteData: Omit<Note, '_id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
        if (editingNote) {
            await noteApi.updateNote(editingNote._id, noteData);
        } else {
            const newNote = await noteApi.createNote(noteData);
            setActiveNoteId(newNote._id); 
        }
        fetchNotes();
        setIsFormModalOpen(false);
        setEditingNote(null);
    };

    const handleLogout = async () => {
        await noteApi.logout();
        setIsAuthenticated(false);
        setCurrentUser(null);
        setNotes([]);
        setActiveNoteId(null);
    };

    const handleLoginSuccess = () => {
        checkAuthStatus();
    };

    if (isAuthLoading) {
        return (
            <div className="h-screen w-screen bg-white dark:bg-slate-900 flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }
    
    if (!isAuthenticated) {
        return <AuthPage onLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div className="h-screen w-screen bg-slate-100 dark:bg-slate-800/50 text-slate-800 dark:text-slate-300 font-sans flex overflow-hidden">
            <Sidebar 
                notes={notes}
                currentUser={currentUser}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                onLogout={handleLogout}
                onOpenSettings={() => setIsProfileModalOpen(true)}
            />
            <NoteList
                notes={filteredNotes}
                isLoading={isLoading}
                activeNoteId={activeNoteId}
                onSelectNote={setActiveNoteId}
                onSearchChange={setSearchTerm}
                onCreateNew={handleCreateNew}
            />
            <NoteEditor
                note={activeNote}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            
            {isFormModalOpen && (
                <NoteFormModal
                    noteToEdit={editingNote}
                    onSubmit={handleFormSubmit}
                    onClose={() => setIsFormModalOpen(false)}
                />
            )}
             {isProfileModalOpen && currentUser && (
                <ProfileModal
                    isOpen={isProfileModalOpen}
                    onClose={() => setIsProfileModalOpen(false)}
                    currentUser={currentUser}
                    onUserUpdate={setCurrentUser}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                />
            )}
        </div>
    );
};

export default App;
