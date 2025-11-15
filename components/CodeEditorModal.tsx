import React, { useState } from "react";

interface CodeEditorModalProps {
    initialCode: string;
    onSave: (updatedCode: string) => void;
    onClose: () => void;
}

const CodeEditorModal: React.FC<CodeEditorModalProps> = ({ initialCode, onSave, onClose }) => {
    const [code, setCode] = useState(initialCode);

    return (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
            <div className="bg-slate-900 text-white w-full max-w-5xl h-[85vh] rounded-lg shadow-xl p-6 relative flex flex-col">
                <h2 className="text-2xl font-bold mb-4">Edit Code</h2>

                <textarea
                    className="flex-1 w-full p-3 bg-slate-800 text-white font-mono rounded-md resize-none border border-slate-700"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />

                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={onClose}
                        className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(code)}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg"
                    >
                        Save Code
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default CodeEditorModal;
