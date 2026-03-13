
import React, { useState, useRef } from 'react';
import { SocialPostCard } from '../../../components/social/SocialPostCard';
import { StoriesTray } from '../../../components/social/StoriesTray';
import { ChallengeCard } from '../../../components/social/ChallengeCard';
import type { User, Post, Story, Challenge } from '../../../types';

interface FeedTabProps {
    onViewProfile: (userId: string) => void;
    allUsers: User[];
    onToggleBookmark: (postId: string) => void;
    onImageClick: (url: string) => void;
    posts: Post[];
    onToggleLike: (postId: string) => void;
    onAddComment: (postId: string, text: string) => void;
    onNewPost: (text: string, image: string | null) => void;
    stories: Story[];
    onStoryClick: (userId: string) => void;
    challenges: Challenge[];
    onChallengeClick: (challengeId: string) => void;
    onHobbyFilter: (hobby: string) => void;
}

const FeedTab: React.FC<FeedTabProps> = ({ onViewProfile, allUsers, onToggleBookmark, onImageClick, posts, onToggleLike, onAddComment, onNewPost, stories, onStoryClick, challenges, onChallengeClick, onHobbyFilter }) => {
    const [newPostText, setNewPostText] = useState('');
    const [newPostImage, setNewPostImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewPostImage(URL.createObjectURL(file));
        }
    };

    const handlePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPostText.trim() || newPostImage) {
            onNewPost(newPostText, newPostImage);
            setNewPostText('');
            setNewPostImage(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="pt-4">
            <StoriesTray stories={stories} allUsers={allUsers} onStoryClick={onStoryClick} />
            {challenges.map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} onChallengeClick={onChallengeClick} />
            ))}
            <form onSubmit={handlePost} className="bg-card p-3 rounded-2xl mb-4">
                <textarea
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="Share what you made…"
                    className="w-full bg-background-secondary border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                    rows={3}
                />
                {newPostImage && (
                    <div className="mt-2 relative">
                        <img src={newPostImage} alt="Preview" className="rounded-lg max-h-40" />
                        <button onClick={() => setNewPostImage(null)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6">&times;</button>
                    </div>
                )}
                <div className="flex items-center mt-2">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        className="hidden"
                        ref={fileInputRef}
                    />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="text-accent p-2 rounded-full hover:bg-background-tertiary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </button>
                    <button type="submit" className="ml-auto bg-primary-button text-primary-button-text font-bold py-2 px-5 rounded-full hover:bg-primary-button-hover transition-colors">
                        Post
                    </button>
                </div>
            </form>
            <div>{posts.map((post) => {
                const postUser = allUsers.find(u => u.id === post.userId);
                return <SocialPostCard
                    key={post.id}
                    post={post}
                    user={postUser}
                    onToggleLike={onToggleLike}
                    onAddComment={onAddComment}
                    onViewProfile={onViewProfile}
                    onToggleBookmark={onToggleBookmark}
                    onImageClick={onImageClick}
                    onHobbyFilter={onHobbyFilter}
                />
            })}</div>
        </div>
    );
};

export default FeedTab;
