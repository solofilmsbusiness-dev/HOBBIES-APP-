
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ProfileDeckModal } from '../../components/modals/ProfileDeckModal';
import { SocialPostCard } from '../../components/social/SocialPostCard';
import FriendsTab from './social/FriendsTab';
import { GearIcon, TrophyIcon } from '../../components/common/Icons';
import type { User, FriendshipStatus, Post } from '../../types';
import { FRIENDS_DATA } from '../../constants';

const HOBBY_COLORS: Record<string, string> = {
    Photography: '#B8FF00', Painting: '#f472b6', Hiking: '#34d399', Coding: '#818cf8',
    Cooking: '#fbbf24', Yoga: '#f472b6', Gaming: '#818cf8', Baking: '#fbbf24',
    Pottery: '#fb923c', Knitting: '#a78bfa', Reading: '#67e8f9', Writing: '#a78bfa',
    Gardening: '#34d399', Music: '#f472b6', Movies: '#818cf8', Astronomy: '#67e8f9',
};

interface ProfileHeaderProps {
    user: User;
    isCurrentUser: boolean;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onGoToSettings: () => void;
    setIsDeckModalOpen: (isOpen: boolean) => void;
    onMessage: (userId: string) => void;
    friendshipStatus: FriendshipStatus;
    onFriendAction: (action: string, userId: string) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user, isCurrentUser, fileInputRef, handlePhotoUpload, onGoToSettings, setIsDeckModalOpen, onMessage, friendshipStatus, onFriendAction }) => {
    const hobbiesDone = user.completedHobbies || 0;

    const FriendActionButton = () => {
        switch (friendshipStatus) {
            case 'friends':
                return <button onClick={() => onFriendAction('unfriend', user.id)} className="bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-600 transition-colors">Unfriend</button>;
            case 'pending_outgoing':
                return <button onClick={() => onFriendAction('cancel', user.id)} className="bg-background-tertiary text-text-primary font-bold py-2 px-6 rounded-full hover:bg-opacity-80 transition-colors">Cancel Request</button>;
            case 'pending_incoming':
                return (<div className="flex gap-2">
                    <button onClick={() => onFriendAction('accept', user.id)} className="bg-green-500 text-white font-bold py-2 px-6 rounded-full">Accept</button>
                    <button onClick={() => onFriendAction('decline', user.id)} className="bg-gray-600 text-white font-bold py-2 px-6 rounded-full">Decline</button>
                </div>);
            default:
                return <button onClick={() => onFriendAction('add', user.id)} className="bg-accent text-accent-text font-bold py-2 px-6 rounded-full hover:bg-opacity-80 transition-colors">Add Friend</button>;
        }
    };

    const ActionButtons = () => {
        if (isCurrentUser) {
            return (
                <button onClick={onGoToSettings} className="bg-background-secondary text-text-primary font-bold py-2 px-6 rounded-full hover:bg-background-tertiary transition-colors">
                    Edit Profile
                </button>
            );
        }
        return (
            <>
                <FriendActionButton />
                <button onClick={() => onMessage(user.id)} className="bg-background-secondary text-text-primary font-bold py-2 px-6 rounded-full hover:bg-background-tertiary transition-colors">
                    Message
                </button>
            </>
        );
    };

    return (
        <div className="flex-shrink-0">
            <div className="relative h-40">
                <img src={user.banner} alt={`${user.name}'s banner`} className="w-full h-full object-cover" />
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                    <div className="relative">
                        <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-background-primary" />
                        <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-green-400 ring-3 ring-background-primary" />
                        {isCurrentUser && (
                            <>
                                <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handlePhotoUpload} />
                                <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 bg-primary-button text-primary-button-text rounded-full w-7 h-7 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z" /></svg>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="pt-16 text-center px-4">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-text-secondary">@{user.username}</p>
                <p className="text-sm text-text-primary mt-2 max-w-md mx-auto">{user.bio}</p>
                <div className="flex justify-center gap-2 mt-3 flex-wrap">
                    {user.hobbies.map(hobby => {
                        const color = HOBBY_COLORS[hobby] || '#B8FF00';
                        return <span key={hobby} className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: `${color}20`, color }}>{hobby}</span>;
                    })}
                </div>
                <div className="flex justify-center gap-6 my-4">
                    <div><strong className="block text-accent">{user.friendCount}</strong><span className="text-sm text-text-secondary">Friends</span></div>
                    <div><strong className="block text-accent">{user.followerCount}</strong><span className="text-sm text-text-secondary">Followers</span></div>
                    <div>
                        <button onClick={() => setIsDeckModalOpen(true)} className="flex flex-col items-center hover:opacity-80 transition-opacity">
                            <strong className="block">{hobbiesDone}</strong>
                            <div className="flex items-center gap-1">
                                <TrophyIcon className="w-4 h-4 text-accent" />
                                <span className="text-sm text-text-secondary">Deck</span>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                    <ActionButtons />
                </div>
            </div>
        </div>
    );
};

interface TabSwitcherProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isCurrentUser: boolean;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ activeTab, setActiveTab, isCurrentUser }) => (
    <div className="mt-6 border-t border-border flex-shrink-0">
        <div className="flex justify-around">
            <button onClick={() => setActiveTab('posts')} className={`py-3 w-full font-semibold transition-colors ${activeTab === 'posts' ? 'text-accent border-b-2 border-accent' : 'text-text-secondary'}`}>
                Posts
            </button>
            <button onClick={() => setActiveTab('friends')} className={`py-3 w-full font-semibold transition-colors ${activeTab === 'friends' ? 'text-accent border-b-2 border-accent' : 'text-text-secondary'}`}>
                Friends
            </button>
            {isCurrentUser && (
                <button onClick={() => setActiveTab('saved')} className={`py-3 w-full font-semibold transition-colors ${activeTab === 'saved' ? 'text-accent border-b-2 border-accent' : 'text-text-secondary'}`}>
                    Saved
                </button>
            )}
        </div>
    </div>
);

interface SavedTabProps {
    posts: Post[];
    onViewProfile: (userId: string) => void;
    allUsers: User[];
    onToggleBookmark: (postId: string) => void;
    onImageClick: (url: string) => void;
    onToggleLike: (postId: string) => void;
    onAddComment: (postId: string, text: string) => void;
}

const SavedTab: React.FC<SavedTabProps> = ({ onViewProfile, allUsers, onToggleBookmark, onImageClick, posts, onToggleLike, onAddComment }) => {
    const savedPosts = useMemo(() => posts.filter(p => p.bookmarked), [posts]);

    if (savedPosts.length === 0) {
        return <div className="text-center text-text-tertiary pt-16">You haven't saved any posts yet.</div>;
    }

    return (
        <div className="pt-4">
            {savedPosts.map((post) => {
                const postUser = allUsers.find(u => u.id === post.userId);
                return <SocialPostCard key={post.id} post={post} user={postUser} onToggleLike={onToggleLike} onAddComment={onAddComment} onViewProfile={onViewProfile} onToggleBookmark={onToggleBookmark} onImageClick={onImageClick} onHobbyFilter={()=>{}} />;
            })}
        </div>
    );
};

interface ProfileScreenProps {
    userId: string;
    onBack: () => void;
    onMessage: (userId: string) => void;
    friendshipStatus: FriendshipStatus;
    onFriendAction: (action: string, userId: string) => void;
    onViewProfile: (userId: string) => void;
    allUsers: User[];
    currentUser: User;
    onGoToSettings: () => void;
    posts: Post[];
    onToggleLike: (postId: string) => void;
    onAddComment: (postId: string, text: string) => void;
    onToggleBookmark: (postId: string) => void;
    onImageClick: (url: string) => void;
    onUpdateUser: (user: User) => void;
    onAvatarClick: (url: string) => void;
    showToast: (message: string) => void;
    onNewPost: (text: string, image: string | null) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
    const { userId, onBack, onMessage, friendshipStatus, onFriendAction, onViewProfile, allUsers, currentUser, onGoToSettings, posts, onToggleLike, onAddComment, onToggleBookmark, onImageClick, onUpdateUser, onAvatarClick, showToast, onNewPost } = props;
    
    const user = allUsers.find(f => f.id === userId);
    const [activeTab, setActiveTab] = useState('posts');
    const [isDeckModalOpen, setIsDeckModalOpen] = useState(false);
    const isCurrentUser = userId === currentUser.id;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [newPostText, setNewPostText] = useState('');
    const [newPostImage, setNewPostImage] = useState<string | null>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewPostImage(URL.createObjectURL(e.target.files[0]));
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

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onUpdateUser({ ...currentUser, avatar: URL.createObjectURL(e.target.files[0]) });
        }
    };
    
    if (!user) return <div className="p-8 text-center"><p>User not found.</p><button onClick={onBack} className="mt-4 bg-primary-button text-primary-button-text font-bold py-2 px-4 rounded-full">Back</button></div>;

    const userPosts = useMemo(() => posts.filter(p => p.userId === userId), [posts, userId]);

    return (
        <>
            <ProfileDeckModal user={user} isOpen={isDeckModalOpen} onClose={() => setIsDeckModalOpen(false)} showToast={showToast} />
            <div ref={scrollContainerRef} className="relative w-full h-full bg-background-primary text-text-primary overflow-y-auto">
                {!isCurrentUser && <button onClick={onBack} className="absolute top-6 left-6 z-20 text-white text-3xl leading-none font-bold">&larr;</button>}
                {isCurrentUser && <button onClick={onGoToSettings} className="absolute top-6 right-6 z-20 text-white"><GearIcon className="w-6 h-6" /></button>}

                <ProfileHeader user={user} isCurrentUser={isCurrentUser} fileInputRef={fileInputRef} handlePhotoUpload={handlePhotoUpload} onGoToSettings={onGoToSettings} setIsDeckModalOpen={setIsDeckModalOpen} onMessage={onMessage} friendshipStatus={friendshipStatus} onFriendAction={onFriendAction} />
                <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} isCurrentUser={isCurrentUser} />

                <div className="p-4 pb-24">
                    {activeTab === 'posts' && (
                        <>
                        {isCurrentUser && (
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
                        )}
                        {userPosts.length > 0 ? (
                            userPosts.map(post => <SocialPostCard key={post.id} post={post} user={user} onToggleLike={onToggleLike} onAddComment={onAddComment} onViewProfile={onViewProfile} onToggleBookmark={onToggleBookmark} onImageClick={onImageClick} onHobbyFilter={() => {}} />)
                        ) : (
                            <p className="text-center text-text-tertiary mt-8">No posts yet.</p>
                        )}
                        </>
                    )}
                    {activeTab === 'friends' && <FriendsTab friends={FRIENDS_DATA} onViewProfile={onViewProfile} onHobbyFilter={() => {}} onAvatarClick={onAvatarClick} />}
                    {activeTab === 'saved' && isCurrentUser && <SavedTab posts={posts} onViewProfile={onViewProfile} allUsers={allUsers} onToggleBookmark={onToggleBookmark} onImageClick={onImageClick} onToggleLike={onToggleLike} onAddComment={onAddComment} />}
                </div>
            </div>
        </>
    );
};

export default ProfileScreen;
