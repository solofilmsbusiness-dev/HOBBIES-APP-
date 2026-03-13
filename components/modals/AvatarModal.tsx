
import React from 'react';

interface AvatarModalProps {
    imageUrl: string | null;
    onClose: () => void;
}

export const AvatarModal: React.FC<AvatarModalProps> = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;
    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div className="relative animate-pop-in" onClick={(e) => e.stopPropagation()}>
                <img
                    src={imageUrl.replace('w=200', 'w=800').replace('w=900', 'w=800')}
                    alt="Expanded avatar"
                    className="rounded-full w-64 h-64 object-cover border-4 border-white shadow-2xl"
                />
                <button
                    onClick={onClose}
                    className="absolute -top-2 -right-2 bg-primary-button text-primary-button-text rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg"
                    aria-label="Close"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};
