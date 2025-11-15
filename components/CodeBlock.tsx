import React, { useEffect, useRef, useState } from 'react';

interface CodeBlockProps {
    code: string;
    language: string;
}

// Need to declare hljs as it's loaded from a script tag in index.html
declare const hljs: any;

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
    const codeRef = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (codeRef.current && typeof hljs !== 'undefined') {
            try {
                hljs.highlightElement(codeRef.current);
            } catch (error) {
                console.error("Failed to highlight code block:", error);
            }
        }
    }, [code, language]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-4 bg-slate-800 dark:bg-[#282c34] rounded-lg">
            <pre className="overflow-x-auto">
                <code ref={codeRef} className={`language-${language} p-4 block`}>
                    {code.trim()}
                </code>
            </pre>
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 bg-slate-600 dark:bg-slate-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-500 dark:hover:bg-slate-600"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
};

export default CodeBlock;