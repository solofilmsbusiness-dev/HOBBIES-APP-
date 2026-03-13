
import React, { useState } from 'react';
import type { DeckItem } from '../../types';
import { LockIcon } from '../common/Icons';

interface DeckCardProps {
    hobby: DeckItem;
    onRemove: (id: string | number) => void;
    isNew: boolean;
    showToast: (message: string) => void;
}

export const DeckCard: React.FC<DeckCardProps> = ({ hobby, onRemove, isNew, showToast }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const isPremium = hobby.points >= 100 && hobby.status === 'completed';

    const handleFlip = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFlipped(!isFlipped);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        showToast(`Shared ${hobby.title}!`);
    };

    return (
        <div className="relative h-40 cursor-pointer group perspective" onClick={handleFlip}>
            <div className={`relative w-full h-full card-flipper ${isFlipped ? 'is-flipped' : ''}`}>
                {/* Front of the card */}
                <div className="card-face">
                    <div
                        className={`relative rounded-2xl overflow-hidden p-3 flex flex-col justify-end h-full w-full ${isPremium || hobby.isMystery ? 'holographic-border' : 'border-2'} ${isNew ? 'animate-glow' : ''}`}
                        style={!isPremium && !hobby.isMystery ? { borderColor: hobby.color } : {}}
                    >
                        <img src={hobby.image} alt={hobby.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40" />
                        {hobby.status === 'completed' ? (
                            <div className="absolute top-2 right-2 bg-green-500/80 rounded-full w-6 h-6 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        ) : (
                            <>
                                <div className="absolute top-2 right-2 bg-yellow-500/80 rounded-full px-2 py-0.5 text-xs font-bold">
                                    PENDING
                                </div>
                                {onRemove && !hobby.isMystery && <button
                                    onClick={(e) => { e.stopPropagation(); onRemove(hobby.id); }}
                                    className="absolute top-2 left-2 bg-red-500/80 rounded-full w-6 h-6 flex items-center justify-center text-white font-bold text-sm z-10"
                                    aria-label="Remove from deck">
                                    ×
                                </button>}
                                {hobby.isMystery && (
                                    <div className="absolute top-2 left-2 bg-gray-700/80 rounded-full w-6 h-6 flex items-center justify-center z-10" title="This hobby is permanent">
                                        <LockIcon className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </>
                        )}
                        <div className="relative z-10">
                            <h3 className="font-bold text-white">{hobby.title}</h3>
                            <p className="text-sm text-gray-200">{hobby.points} pts</p>
                        </div>
                    </div>
                </div>
                {/* Back of the card */}
                <div className="card-face card-back bg-card p-3 flex flex-col justify-between text-text-primary">
                    <div className="overflow-y-auto text-xs space-y-1">
                        <h4 className="font-bold text-sm mb-1">{hobby.title}</h4>
                        <p className="text-text-secondary">{hobby.description}</p>
                        <p><strong className="text-text-tertiary">Location:</strong> {hobby.location}</p>
                        <p><strong className="text-text-tertiary">Time:</strong> {hobby.time}</p>
                    </div>
                    <button
                        onClick={handleShare}
                        className="mt-2 w-full bg-primary-button text-primary-button-text font-bold py-2 rounded-full text-xs hover:bg-primary-button-hover transition-colors"
                    >
                        Share Hobby
                    </button>
                </div>
            </div>
        </div>
    );
};
