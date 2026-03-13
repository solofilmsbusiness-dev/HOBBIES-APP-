
import React from 'react';
import { TrophyIcon } from '../common/Icons';
import type { Challenge } from '../../types';

interface ChallengeCardProps {
    challenge: Challenge;
    onChallengeClick: (id: string) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, onChallengeClick }) => (
    <div className="bg-card rounded-2xl mb-4 overflow-hidden hover-lift p-4 cursor-pointer holographic-border" onClick={() => onChallengeClick(challenge.id)}>
        <div className="flex items-center gap-2 mb-2">
            <TrophyIcon className="w-6 h-6 text-accent" />
            <h3 className="text-lg font-bold">{challenge.hobby} Challenge</h3>
        </div>
        <h4 className="text-md font-semibold">{challenge.title}</h4>
        <p className="text-sm text-text-secondary my-2">{challenge.description}</p>
        <div className="flex justify-between items-center text-xs text-text-tertiary">
            <span>Ends in: {challenge.endsIn}</span>
            <span>Reward: {challenge.reward.points}pts + Badge</span>
        </div>
    </div>
);
