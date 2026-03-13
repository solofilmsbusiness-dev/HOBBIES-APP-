import React, { useState, useMemo, useEffect } from 'react';
import { FRIENDS_DATA } from '../../constants';
import FeedTab from './social/FeedTab';
import DeckTab from './social/DeckTab';
import FriendsTab from './social/FriendsTab';
import MessagingHubTab from './social/MessagingHubTab';
import type { DeckItem, Message, User, Post, Story, Challenge } from '../../types';

interface SocialScreenProps {
    onViewProfile: (userId: string) => void;
    deckItems: DeckItem[];
    onRemoveFromDeck: (id: string | number) => void;
    onReorderDeckItems: (items: DeckItem[]) => void;
    messages: Message[];
    onViewChat: (userId: string) => void;
    requests: User[];
    outgoingRequests: User[];
    onFriendAction: (action: string, userId: string) => void;
    badgeCounts: { messages: number; requests: number };
    initialTab?: string;
    showToast: (message: string) => void;
    onComposeNew: () => void;
    onAvatarClick: (url: string) => void;
    newlyAddedDeckItemId: string | number | null;
    allUsers: User[];
    posts: Post[];
    onToggleLike: (postId: string) => void;
    onAddComment: (postId: string, text: string) => void;
    onNewPost: (text: string, image: string | null) => void;
    onToggleBookmark: (postId: string) => void;
    onImageClick: (url: string) => void;
    stories: Story[];
    onStoryClick: (userId: string) => void;
    challenges: Challenge[];
    onChallengeClick: (challengeId: string) => void;
}

const SocialScreen: React.FC<SocialScreenProps> = (props) => {
    const { initialTab, badgeCounts } = props;
    const [activeSubTab, setActiveSubTab] = useState(initialTab || 'Feed');
    const subTabs = ['Feed', 'Deck', 'Friends', 'Messages'];
    const [hobbyFilter, setHobbyFilter] = useState<string | null>(null);

    const handleHobbyFilter = (hobby: string) => {
        setHobbyFilter(current => {
            if (current === hobby) {
                props.showToast(`Cleared filter.`);
                return null;
            } else {
                props.showToast(`Filtering by ${hobby}.`);
                return hobby;
            }
        });
    };

    const filteredFriends = useMemo(() => {
        if (!hobbyFilter) return FRIENDS_DATA;
        return FRIENDS_DATA.filter(f => (f.primaryHobby?.name || 'Hobbyist').toLowerCase() === hobbyFilter.toLowerCase());
    }, [hobbyFilter]);

    const filteredPosts = useMemo(() => {
        if (!hobbyFilter) return props.posts;
        return props.posts.filter(post => {
            const postUser = props.allUsers.find(u => u.id === post.userId);
            return postUser?.primaryHobby?.name.toLowerCase() === hobbyFilter.toLowerCase();
        });
    }, [props.posts, hobbyFilter, props.allUsers]);


    useEffect(() => {
        if (initialTab) {
            setActiveSubTab(initialTab);
        }
    }, [initialTab]);

    const headerText = useMemo(() => {
        switch (activeSubTab) {
            case 'Feed': return hobbyFilter ? `Feed • ${hobbyFilter}` : 'Social Feed';
            case 'Deck': return 'Social Deck';
            case 'Friends': return hobbyFilter ? `Friends • ${hobbyFilter}` : 'Friends';
            case 'Messages': return 'Messages';
            default: return 'Social Hub';
        }
    }, [activeSubTab, hobbyFilter]);

    const TabButton: React.FC<{ name: string; badgeCount?: number }> = ({ name, badgeCount }) => (
        <button
            onClick={() => setActiveSubTab(name)}
            className={`relative w-full text-center py-2 rounded-full text-sm font-semibold transition-colors ${activeSubTab === name ? 'bg-background-tertiary text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
        >
            {name}
            {badgeCount && badgeCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {badgeCount}
                </span>
            )}
        </button>
    );

    return (
        <div className="relative w-full h-full bg-background-primary text-text-primary">
            <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-10" alt="Hobby background" />
            <main className="relative z-10 overflow-y-auto p-4 pt-12 pb-24 h-full">
                <div className="text-center">
                    <h1 className="text-4xl" style={{ fontFamily: '"Lobster", cursive' }}>
                        {headerText}
                    </h1>
                    <p className="text-text-secondary mt-1 text-sm">
                        Your community and connections
                    </p>
                </div>
                <div className="my-4 p-1 bg-card rounded-full flex justify-between items-center gap-1">
                    {subTabs.map((tab) => (
                        <TabButton
                            key={tab}
                            name={tab}
                            badgeCount={tab === 'Messages' ? badgeCounts.messages + badgeCounts.requests : undefined}
                        />
                    ))}
                </div>
                <div>
                    {activeSubTab === 'Feed' && <FeedTab onNewPost={props.onNewPost} posts={filteredPosts} onToggleLike={props.onToggleLike} onAddComment={props.onAddComment} onViewProfile={props.onViewProfile} allUsers={props.allUsers} onToggleBookmark={props.onToggleBookmark} onImageClick={props.onImageClick} stories={props.stories} onStoryClick={props.onStoryClick} challenges={props.challenges} onChallengeClick={props.onChallengeClick} onHobbyFilter={handleHobbyFilter} />}
                    {activeSubTab === 'Deck' && <DeckTab deckItems={props.deckItems} onRemoveItem={props.onRemoveFromDeck} onReorderItems={props.onReorderDeckItems} newlyAddedDeckItemId={props.newlyAddedDeckItemId} showToast={props.showToast} />}
                    {activeSubTab === 'Friends' && <FriendsTab friends={filteredFriends} onViewProfile={props.onViewProfile} onAvatarClick={props.onAvatarClick} onHobbyFilter={handleHobbyFilter} />}
                    {activeSubTab === 'Messages' && <MessagingHubTab messages={props.messages} onViewChat={props.onViewChat} requests={props.requests} outgoingRequests={props.outgoingRequests} onFriendAction={props.onFriendAction} badgeCounts={badgeCounts} onComposeNew={props.onComposeNew} onViewProfile={props.onViewProfile} />}
                </div>
            </main>
        </div>
    );
};

export default SocialScreen;