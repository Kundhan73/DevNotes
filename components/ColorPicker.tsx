import React from 'react';
import { NOTE_COLORS } from '../types';

interface ColorPickerProps {
    selectedColor: string;
    onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {
    return (
        <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 dark:text-slate-400">Color:</span>
            <div className="flex gap-2">
                {NOTE_COLORS.map(color => (
                    <button
                        key={color.name}
                        type="button"
                        onClick={() => onColorChange(color.name)}
                        className={`w-6 h-6 rounded-full ${color.bg} transition-transform transform hover:scale-110 ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 ring-teal-500' : ''}`}
                        aria-label={`Select ${color.name} color`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorPicker;