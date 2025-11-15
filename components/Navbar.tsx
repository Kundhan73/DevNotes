
import React from 'react';

interface NavbarProps {
    currentView: 'notes' | 'snippets';
    setView: (view: 'notes' | 'snippets') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
    
    const navItemClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
    const activeClasses = "bg-slate-700 text-white";
    const inactiveClasses = "text-slate-300 hover:bg-slate-800 hover:text-white";

    return (
        <nav className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <svg className="h-8 w-8 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        <span className="text-xl font-bold text-white">DevNotes</span>
                    </div>
                    <div className="flex items-center bg-slate-800 rounded-lg p-1">
                        <button
                            onClick={() => setView('notes')}
                            className={`${navItemClasses} ${currentView === 'notes' ? activeClasses : inactiveClasses}`}
                        >
                            Notes
                        </button>
                        <button
                            onClick={() => setView('snippets')}
                            className={`${navItemClasses} ${currentView === 'snippets' ? activeClasses : inactiveClasses}`}
                        >
                            Snippets
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
