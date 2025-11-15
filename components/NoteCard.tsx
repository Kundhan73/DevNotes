import React, { useState } from 'react';
import { Note, NOTE_COLORS } from '../types';

interface NoteCardProps {
    note: Note;
    onDelete: (id: string) => void;
    onEdit: (note: Note) => void;
    onViewCode: (code: string, title: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onDelete, onEdit, onViewCode }) => {
    const [copied, setCopied] = useState(false);
    
    const colorScheme = NOTE_COLORS.find(c => c.name === note.color) || NOTE_COLORS[0];
    const cardBgColor = colorScheme.bg.replace('bg-', 'bg-') + '/10';
    const textColor = colorScheme.text;

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent modal from opening
        if (note.code) {
            navigator.clipboard.writeText(note.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className={`rounded-lg border border-slate-700/50 shadow-lg flex flex-col transition-all duration-300 hover:shadow-blue-500/20 hover:border-slate-600 ${cardBgColor}`}>
            <div className="p-4 flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-bold text-lg ${textColor}`}>{note.title}</h3>
                     <span className="text-xs text-slate-500">{note.category}</span>
                </div>
                {note.content && <p className="text-slate-300 text-sm mb-3 whitespace-pre-wrap">{note.content}</p>}
                
                {note.code && (
                    <div onClick={() => onViewCode(note.code!, note.title)} className="relative bg-slate-900/70 rounded-md my-2 group cursor-pointer">
                        <pre className="text-xs text-slate-300 overflow-x-auto p-3 max-h-40">
                            <code>{note.code.trim()}</code>
                        </pre>
                        <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => { e.stopPropagation(); onViewCode(note.code!, note.title); }} className="bg-slate-700 text-slate-300 p-1 rounded hover:bg-slate-600 transition-colors" aria-label="Maximize code">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1v4m0 0h-4m4 0l-5-5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5 5" />
                                </svg>
                            </button>
                            <button onClick={handleCopy} className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded hover:bg-slate-600 transition-colors">
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                )}
                
                <div className="flex flex-wrap gap-1 mt-3">
                    {note.tags.map(tag => (
                        <span key={tag} className={`text-xs px-2 py-1 rounded-full ${colorScheme.bg}/30 ${textColor}`}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="bg-slate-800/50 p-2 flex justify-between items-center rounded-b-lg border-t border-slate-700/50">
                <span className="text-xs text-slate-500">{new Date(note.createdAt).toLocaleDateString()}</span>
                <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(note)} className="text-slate-400 hover:text-blue-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
                        </svg>
                    </button>
                    <button onClick={() => onDelete(note._id)} className="text-slate-400 hover:text-red-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;