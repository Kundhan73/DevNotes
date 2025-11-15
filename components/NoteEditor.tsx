import React, { useState } from "react";
import CodeBlock from "./CodeBlock";
import CodeEditorModal from "./CodeEditorModal";

interface NoteEditorProps {
    note: any;
    onEdit: (note: any) => void;
    onDelete: (id: string) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onEdit, onDelete }) => {
    const [isCodeEditorOpen, setIsCodeEditorOpen] = useState(false);

    if (!note) {
        return (
            <div className="flex items-center justify-center h-full text-slate-400">
                Select a note to view it.
            </div>
        );
    }

    return (
        <div className="p-8 h-full overflow-y-auto">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{note.title}</h1>

                <div className="flex gap-3">

                    {/* EDIT BUTTON */}
                    <button
                        className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                        onClick={() => onEdit(note)}
                    >
                        Edit
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                        className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                        onClick={() => onDelete(note._id)}
                    >
                        Delete
                    </button>

                </div>
            </div>

            {/* CONTENT */}
            {note.content && (
                <p className="text-slate-300 whitespace-pre-wrap mb-6">
                    {note.content}
                </p>
            )}

            {/* CODE BLOCK */}
            {note.code && (
                <div className="mb-6">
                    <CodeBlock code={note.code} language={note.language} />

                    <button
                        onClick={() => setIsCodeEditorOpen(true)}
                        className="mt-3 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                        Edit Code
                    </button>
                </div>
            )}

            {/* IMAGE */}
            {note.image && (
                <img
                    src={note.image}
                    alt="Note"
                    className="rounded-lg shadow-lg max-w-full mt-6"
                />
            )}

            {/* TAGS */}
            {note.tags && note.tags.length > 0 && (
                <div className="mt-6">
                    <h3 className="font-semibold text-slate-400 mb-2">Tags</h3>
                    <div className="flex gap-2 flex-wrap">
                        {note.tags.map((tag: string, index: number) => (
                            <span
                                key={index}
                                className="bg-slate-700 px-3 py-1 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* CODE EDITOR POPUP */}
            {isCodeEditorOpen && (
                <CodeEditorModal
                    initialCode={note.code}
                    onSave={(updatedCode) => {
                        onEdit({ ...note, code: updatedCode });
                        setIsCodeEditorOpen(false);
                    }}
                    onClose={() => setIsCodeEditorOpen(false)}
                />
            )}
        </div>
    );
};

export default NoteEditor;
