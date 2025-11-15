import React from 'react';
import { Note } from '../types';
import NoteListItem from './NoteListItem';
import SearchBar from './SearchBar';

interface NoteListProps {
    notes: Note[];
    isLoading: boolean;
    activeNoteId: string | null;
    onSelectNote: (id: string) => void;
    onSearchChange: (term: string) => void;
    onCreateNew: () => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, isLoading, activeNoteId, onSelectNote, onSearchChange, onCreateNew }) => {
    return (
        <aside className="w-80 bg-slate-100/50 dark:bg-slate-800/50 flex flex-col border-r border-slate-200 dark:border-slate-700/50">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700/50 flex-shrink-0">
                 <div className="flex items-center gap-2">
                    <SearchBar onSearchChange={onSearchChange} />
                    <button onClick={onCreateNew} className="p-2 bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors flex-shrink-0" aria-label="Create new note">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                 </div>
            </div>
            <div className="overflow-y-auto flex-grow">
                {isLoading && (
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
                    </div>
                )}
                {!isLoading && notes.length === 0 && (
                    <p className="text-center text-slate-500 dark:text-slate-500 p-4">No notes found.</p>
                )}
                {!isLoading && notes.map(note => (
                    <NoteListItem
                        key={note._id}
                        note={note}
                        isActive={note._id === activeNoteId}
                        onSelect={() => onSelectNote(note._id)}
                    />
                ))}
            </div>
        </aside>
    );
};

export default NoteList;