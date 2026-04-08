
import React, { useState, useMemo } from 'react';
import { HobbyChip } from '../../../components/common/HobbyChip';
import type { User } from '../../../types';

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

interface FriendsTabProps {
    friends: User[];
    onViewProfile: (userId: string) => void;
    onAvatarClick: (url: string) => void;
    onHobbyFilter: (hobby: string) => void;
}

const FriendsTab: React.FC<FriendsTabProps> = ({ friends, onViewProfile, onAvatarClick, onHobbyFilter }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredFriends = useMemo(() => {
        if (!searchQuery.trim()) return friends;
        const searchTerms = searchQuery.toLowerCase().split(' ').filter(Boolean);

        return friends.filter(friend => {
            const searchableText = [
                friend.name,
                friend.username,
                friend.primaryHobby.name,
                friend.primaryHobby.descriptor,
                ...friend.hobbies
            ].join(' ').toLowerCase();

            return searchTerms.every(term => searchableText.includes(term));
        });
    }, [friends, searchQuery]);

    return (
        <div className="pt-4">
            <div className="mb-4">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, @handle, or hobby..."
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>
            <div className="space-y-3">
                {filteredFriends.map(friend => (
                    <div key={friend.id} className="bg-card rounded-xl p-3 flex items-center gap-4 cursor-pointer hover:bg-background-secondary transition-colors hover-lift">
                        <div className="relative flex-shrink-0">
                            <img
                                src={friend.avatar}
                                alt={friend.name}
                                className="w-12 h-12 rounded-full object-cover transition-transform duration-200 hover:scale-110"
                                onClick={(e) => { e.stopPropagation(); onAvatarClick(friend.avatar); }}
                            />
                            {parseInt(friend.id.replace('f', '')) % 3 !== 0 && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 ring-2 ring-card" />
                            )}
                        </div>
                        <div className="flex-grow" onClick={() => onViewProfile(friend.id)}>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <p className="font-semibold text-text-primary truncate">
                                    <Highlight text={friend.name} highlight={searchQuery} />
                                </p>
                                <HobbyChip user={friend} onFilter={onHobbyFilter} highlight={searchQuery} />
                            </div>
                            <p className="text-sm text-text-secondary">
                                @<Highlight text={friend.username} highlight={searchQuery} />
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendsTab;
