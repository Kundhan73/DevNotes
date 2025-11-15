import React, { useState, useEffect } from 'react';
import { Note } from '../types';
import ColorPicker from './ColorPicker';

interface NoteFormModalProps {
    noteToEdit: Note | null;
    onSubmit: (noteData: Omit<Note, '_id' | 'createdAt' | 'updatedAt' | 'userId'>) => void;
    onClose: () => void;
}

const NoteFormModal: React.FC<NoteFormModalProps> = ({ noteToEdit, onSubmit, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [color, setColor] = useState('Default');
    
    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title);
            setContent(noteToEdit.content);
            setCode(noteToEdit.code || '');
            setLanguage(noteToEdit.language || '');
            setImage(noteToEdit.image || '');
            setCategory(noteToEdit.category || '');
            setTags(noteToEdit.tags.join(', '));
            setColor(noteToEdit.color || 'Default');
        } else {
            setTitle('');
            setContent('');
            setCode('');
            setLanguage('');
            setImage('');
            setCategory('');
            setTags('');
            setColor('Default');
        }
    }, [noteToEdit]);

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Only title is required
    if (!title.trim()) {
        alert('Title is required.');
        return;
    }

    // If category is empty, save ""
    const finalCategory = category.trim() || "";

    const processedTags = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

    onSubmit({
        title: title.trim(),
        content,
        code,
        language,
        image,
        category: finalCategory,   // <-- important
        tags: processedTags,
        color,
    });
};

    
    const inputClasses = "w-full bg-slate-200 dark:bg-slate-900 text-slate-800 dark:text-white p-2 rounded-md border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none";

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className={`relative bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl border border-slate-300 dark:border-slate-700`} onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{noteToEdit ? 'Edit Note' : 'Create New Note'}</h2>
                    
                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Note Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={inputClasses}
                            required
                        />
                         <input
                            type="text"
                            placeholder="Category (optional)"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={`w-1/2 ${inputClasses}`}
                        />

                    </div>

                    <textarea
                        placeholder="Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className={`${inputClasses} h-24 resize-y`}
                    />

                    <textarea
                        placeholder="Code Snippet (optional)"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className={`${inputClasses} h-40 resize-y font-mono text-sm`}
                    />

                    <div className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Code Language (e.g., javascript)"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className={`w-1/2 ${inputClasses}`}
                        />
                        <input
                            type="text"
                            placeholder="Image URL (optional)"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className={`w-1/2 ${inputClasses}`}
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Tags (comma, separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className={inputClasses}
                    />

                    <ColorPicker selectedColor={color} onColorChange={setColor} />

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-slate-500 hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            {noteToEdit ? 'Save Changes' : 'Create Note'}
                        </button>
                    </div>
                </form>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NoteFormModal;