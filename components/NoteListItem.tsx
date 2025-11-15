import React from 'react';
import { Note } from '../types';

interface NoteListItemProps {
    note: Note;
    isActive: boolean;
    onSelect: () => void;
}

const NoteListItem: React.FC<NoteListItemProps> = ({ note, isActive, onSelect }) => {
    
    const contentSnippet = note.content.substring(0, 100) + (note.content.length > 100 ? '...' : '');

    return (
        <button
            onClick={onSelect}
            className={`w-full text-left p-4 border-b border-slate-200 dark:border-slate-700/50 transition-colors ${
                isActive ? 'bg-teal-500/20 dark:bg-teal-600/30' : 'hover:bg-slate-200/70 dark:hover:bg-slate-700/50'
            }`}
        >
            <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 truncate pr-2">{note.title}</h3>
                <span className="text-xs text-slate-500 dark:text-slate-500 flex-shrink-0">
                    {new Date(note.createdAt).toLocaleDateString()}
                </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 truncate">
                {contentSnippet}
            </p>
            <div className="flex flex-wrap gap-1 mt-3">
                {note.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {tag}
                    </span>
                ))}
            </div>
        </button>
    );
};

export default NoteListItem;