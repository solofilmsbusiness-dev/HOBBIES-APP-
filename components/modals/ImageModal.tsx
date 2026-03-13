
import React from 'react';

interface ImageModalProps {
    imageUrl: string | null;
    onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;
    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label="Expanded image view"
        >
            <div className="relative animate-pop-in w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                <img
                    src={imageUrl.replace('w=800', 'w=1200')}
                    alt="Expanded post content"
                    className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
                />
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg border-2 border-white"
                    aria-label="Close"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};
