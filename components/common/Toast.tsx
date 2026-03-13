
import React from 'react';

interface ToastProps {
    message: string;
    isVisible: boolean;
}

export const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
    if (!isVisible) return null;
    return (
        <div
            className="absolute top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg animate-fade-in-down z-50"
            role="status"
            aria-live="polite"
        >
            {message}
        </div>
    );
};
