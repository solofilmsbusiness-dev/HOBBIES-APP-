
import React from 'react';
import { DeckCard } from '../deck/DeckCard';
import type { User } from '../../types';

interface ProfileDeckModalProps {
    user: User;
    isOpen: boolean;
    onClose: () => void;
    showToast: (message: string) => void;
}

export const ProfileDeckModal: React.FC<ProfileDeckModalProps> = ({ user, isOpen, onClose, showToast }) => {
    if (!isOpen || !user) return null;
    const completedHobbies = user.deck || [];
    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`${user.name}'s Hobby Deck`}
        >
            <div
                className="bg-card w-full max-w-md rounded-2xl p-4 text-text-primary animate-pop-in flex flex-col"
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: '80vh' }}
            >
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-xl font-bold">{user.name}'s Deck</h2>
                    <button onClick={onClose} className="text-2xl font-bold">&times;</button>
                </div>
                {completedHobbies.length > 0 ? (
                    <div className="overflow-y-auto">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {completedHobbies.map(hobby => (
                                <DeckCard
                                    key={hobby.id}
                                    hobby={hobby}
// FIX: Removed unsupported onCardClick prop.
                                    onRemove={() => { }}
                                    showToast={showToast}
                                    isNew={false}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-text-tertiary py-16 flex-grow">
                        <p>{user.name} hasn't completed any hobbies yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
