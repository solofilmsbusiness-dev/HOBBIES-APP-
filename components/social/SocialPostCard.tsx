
import React, { useState } from 'react';
import { HobbyChip } from '../common/HobbyChip';
import { CommentIcon, BookmarkIcon } from '../common/Icons';
import type { Post, User } from '../../types';

interface SocialPostCardProps {
    post: Post;
    user?: User;
    onToggleLike: (postId: string) => void;
    onAddComment: (postId: string, text: string) => void;
    onViewProfile: (userId: string) => void;
    onToggleBookmark: (postId: string) => void;
    onImageClick: (url: string) => void;
    onHobbyFilter: (hobby: string) => void;
}

export const SocialPostCard: React.FC<SocialPostCardProps> = ({ post, user, onToggleLike, onAddComment, onViewProfile, onToggleBookmark, onImageClick, onHobbyFilter }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [newComment, setNewComment] = useState('');

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(post.id, newComment.trim());
            setNewComment('');
        }
    };

    return (
        <div className="w-full text-left bg-card rounded-2xl border border-white/5 mb-4 overflow-hidden hover-lift">
            <div className="p-4">
                <div className="flex items-start gap-3">
                    {user && (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover cursor-pointer"
                            onClick={() => onViewProfile(user.id)}
                        />
                    )}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                            <button onClick={() => onViewProfile(post.userId)} className="flex items-center gap-1 text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors">
                                <span>@{post.user}</span>
                            </button>
                            {user && <HobbyChip user={user} isClickable={true} onFilter={onHobbyFilter} />}
                        </div>
                        <p className="text-text-primary my-2">{post.text}</p>
                    </div>
                </div>
                {post.image && <img src={post.image} alt="User post" className="rounded-2xl mt-3 max-h-60 w-full object-cover cursor-pointer" onClick={() => onImageClick(post.image!)} />}
                {post.likes > 20 && (
                    <p className="text-xs text-accent/70 mt-2">2 friends also liked this</p>
                )}
                <div className="flex items-center gap-4 mt-3">
                    <button onClick={() => onToggleLike(post.id)} className={`flex items-center gap-2 text-sm font-bold transition-colors z-10 relative ${post.liked ? 'text-accent' : 'text-text-secondary hover:text-accent'}`}>
                        <span className={`text-xl ${post.liked ? 'animate-pulse' : ''}`}>{post.liked ? '♥' : '♡'}</span>
                        {post.likes}
                    </button>
                    <button onClick={() => setIsExpanded((v) => !v)} className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors">
                        <CommentIcon className="w-5 h-5" />
                        <span>{post.comments.length}</span>
                    </button>
                    <button onClick={() => onToggleBookmark(post.id)} className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors ml-auto">
                        <BookmarkIcon className="w-5 h-5" filled={post.bookmarked} />
                    </button>
                </div>
            </div>
            {isExpanded && (
                <div className="px-4 pb-4 border-t border-white/5 mt-2 pt-3">
                    <div className="space-y-3 max-h-32 overflow-y-auto mb-3">
                        {post.comments.map((comment) => (
                            <div key={comment.id} className="text-sm">
                                <span className="font-semibold text-text-secondary">@{comment.user} </span>
                                <p className="text-text-tertiary">{comment.text}</p>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="flex-grow bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 transition-all"
                        />
                        <button type="submit" className="bg-primary-button text-primary-button-text font-black py-2 px-4 rounded-xl text-sm neon-glow">
                            Post
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
