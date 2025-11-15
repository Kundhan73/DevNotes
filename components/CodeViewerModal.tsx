import React, { useState } from 'react';

interface CodeViewerModalProps {
    title: string;
    code: string;
    onClose: () => void;
}

const CodeViewerModal: React.FC<CodeViewerModalProps> = ({ title, code, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-slate-900 rounded-lg shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col border border-slate-700" onClick={(e) => e.stopPropagation()}>
                <header className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
                    <h2 className="text-xl font-bold text-blue-400">{title}</h2>
                    <div className="flex items-center gap-4">
                        <button onClick={handleCopy} className="bg-slate-700 text-slate-300 text-sm px-3 py-1 rounded hover:bg-slate-600 transition-colors">
                            {copied ? 'Copied!' : 'Copy Code'}
                        </button>
                        <button onClick={onClose} className="text-slate-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </header>
                <main className="p-4 flex-grow overflow-auto">
                    <pre className="text-sm text-slate-200 h-full">
                        <code className="h-full w-full">{code.trim()}</code>
                    </pre>
                </main>
            </div>
        </div>
    );
};

export default CodeViewerModal;
