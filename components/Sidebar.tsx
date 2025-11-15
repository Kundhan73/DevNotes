import React, { useMemo } from 'react';
import { Note, User } from '../types';
import { ActiveFilter } from '../App';

interface SidebarProps {
    notes: Note[];
    currentUser: User | null;
    activeFilter: ActiveFilter;
    onFilterChange: (filter: ActiveFilter) => void;
    onLogout: () => void;
    onOpenSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ notes, currentUser, activeFilter, onFilterChange, onLogout, onOpenSettings }) => {

    const folders = useMemo(() => {
        const folderSet = new Set<string>();
        notes.forEach(note => {
            if (note.category) folderSet.add(note.category);
        });
        return Array.from(folderSet).sort((a, b) => a.localeCompare(b));
    }, [notes]);

    const tags = useMemo(() => {
        const tagSet = new Set<string>();
        notes.forEach(note => note.tags.forEach(tag => tagSet.add(tag)));
        return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
    }, [notes]);

    const NavItem: React.FC<{
        filter: ActiveFilter;
        icon: React.ReactElement;
        label: string;
    }> = ({ filter, icon, label }) => {
        const isActive = activeFilter.type === filter.type && activeFilter.value === filter.value;
        return (
            <button
                onClick={() => onFilterChange(filter)}
                className={`w-full flex items-center text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive ? 'bg-teal-500/20 text-teal-400' : 'hover:bg-slate-200 dark:hover:bg-slate-700/50'
                }`}
            >
                <span className="mr-3">{icon}</span>
                <span>{label}</span>
            </button>
        );
    };

    return (
        <aside className="w-64 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-4 flex-shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-700/50">
            <div className="flex items-center mb-6 flex-shrink-0">
                 <svg className="h-8 w-8 text-teal-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">DevNotes</h1>
            </div>
            <div className="overflow-y-auto pr-2 -mr-2 flex-grow text-slate-700 dark:text-slate-300">
                <div className="mb-6">
                    <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">Favorites</h2>
                    <NavItem
                        filter={{ type: 'SPECIAL', value: 'All Snippets' }}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>}
                        label="All Snippets"
                    />
                     <NavItem
                        filter={{ type: 'SPECIAL', value: 'Uncategorized' }}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>}
                        label="Uncategorized"
                    />
                </div>

                <div className="mb-6">
                    <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">Folders</h2>
                    {folders.map(folder => (
                        <NavItem
                            key={folder}
                            filter={{ type: 'FOLDER', value: folder }}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>}
                            label={folder}
                        />
                    ))}
                </div>

                <div>
                    <h2 className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-2">Tags</h2>
                     {tags.map(tag => (
                        <NavItem
                            key={tag}
                            filter={{ type: 'TAG', value: tag }}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-5 5a2 2 0 01-2.828 0l-7-7A2 2 0 013 8V3z" /></svg>}
                            label={tag}
                        />
                    ))}
                </div>
            </div>
            <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-700/50 pt-4 mt-4">
                 {currentUser && (
                    <div className="px-3 mb-4">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{currentUser.username}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                    </div>
                )}
                 <button
                    onClick={onOpenSettings}
                    className="w-full flex items-center text-left px-3 py-2 text-sm rounded-md transition-colors text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700/50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>Settings</span>
                </button>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center text-left px-3 py-2 text-sm rounded-md transition-colors text-slate-600 dark:text-slate-400 hover:bg-red-500/10 dark:hover:bg-red-500/20 hover:text-red-600 dark:hover:text-red-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Log Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;