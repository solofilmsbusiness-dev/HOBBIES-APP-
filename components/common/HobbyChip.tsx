
import React from 'react';
import { HobbyIcon } from './Icons';
import type { User } from '../../types';

interface HighlightProps {
    text: string;
    highlight: string;
}

const Highlight: React.FC<HighlightProps> = ({ text, highlight }) => {
    if (!highlight.trim()) {
        return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight.split(' ').filter(Boolean).join('|')})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) && highlight.toLowerCase().includes(part.toLowerCase()) ? (
                    <span key={i} className="bg-lime-400 text-black rounded">{part}</span>
                ) : (
                    part
                )
            )}
        </span>
    );
};

interface HobbyChipProps {
    user?: User;
    onFilter?: (hobby: string) => void;
    isClickable?: boolean;
    highlight?: string;
}

export const HobbyChip: React.FC<HobbyChipProps> = ({ user, onFilter, isClickable = true, highlight = '' }) => {
    const primaryHobby = user?.primaryHobby || { name: 'Hobbyist', descriptor: 'General' };
    const hobbyName = primaryHobby.name || 'Hobbyist';
    const hobbyDescriptor = primaryHobby.descriptor || 'General';

    const chipContent = (
        <div className="flex items-center gap-1 bg-background-tertiary rounded-full px-2 py-0.5 flex-shrink-0">
            <HobbyIcon hobby={hobbyName} className="w-3 h-3 text-accent" />
            <span className="font-medium text-text-secondary">
                <Highlight text={hobbyName} highlight={highlight} />
            </span>
        </div>
    );

    const fullDisplay = (
        <div className={`flex items-center gap-2 text-xs ${isClickable ? 'group' : ''}`}
            aria-label={`${user?.name || 'User'} - Hobby: ${hobbyName}, ${hobbyDescriptor}`}
        >
            {chipContent}
            <span className="text-text-tertiary hidden sm:inline group-hover:text-text-secondary transition-colors">
                • <Highlight text={hobbyDescriptor} highlight={highlight} />
            </span>
        </div>
    );

    if (!isClickable || !onFilter) {
        return fullDisplay;
    }

    return (
        <button onClick={(e) => { e.stopPropagation(); onFilter(hobbyName); }} className="text-left">
            {fullDisplay}
        </button>
    );
};
