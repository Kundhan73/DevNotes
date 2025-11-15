
import React from 'react';

interface TagFilterProps {
    tags: string[];
    selectedTag: string;
    onTagChange: (tag: string) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTag, onTagChange }) => {
    return (
        <div className="relative">
            <select
                value={selectedTag}
                onChange={(e) => onTagChange(e.target.value)}
                className="appearance-none w-full md:w-48 bg-slate-800 text-white py-2 px-4 pr-8 rounded-lg border border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            >
                {tags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
    );
};

export default TagFilter;
