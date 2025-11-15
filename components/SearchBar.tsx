import React from 'react';

interface SearchBarProps {
    onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
    return (
        <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-slate-400 dark:text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                placeholder="Search notes..."
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white py-2 pl-10 pr-4 rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-colors"
            />
        </div>
    );
};

export default SearchBar;