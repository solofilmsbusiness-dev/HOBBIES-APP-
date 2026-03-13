
import React from 'react';
import type { Story, User } from '../../types';

interface StoryCircleProps {
    story: Story;
    user: User;
    onStoryClick: (userId: string) => void;
}

const StoryCircle: React.FC<StoryCircleProps> = ({ story, user, onStoryClick }) => (
    <div className="text-center flex-shrink-0 w-20" onClick={() => onStoryClick(story.userId)}>
        <div className={`relative rounded-full p-0.5 ${story.hasUnseen ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' : 'bg-gray-700'}`}>
            <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-background-primary"
            />
        </div>
        <p className="text-xs text-text-secondary truncate mt-1">{user.name}</p>
    </div>
);


interface StoriesTrayProps {
    stories: Story[];
    allUsers: User[];
    onStoryClick: (userId: string) => void;
}

export const StoriesTray: React.FC<StoriesTrayProps> = ({ stories, allUsers, onStoryClick }) => (
    <div className="flex gap-4 overflow-x-auto pb-2 mb-4">
        {stories.map(story => {
            const user = allUsers.find(u => u.id === story.userId);
            if (!user) return null;
            return <StoryCircle key={story.userId} story={story} user={user} onStoryClick={onStoryClick} />;
        })}
    </div>
);
