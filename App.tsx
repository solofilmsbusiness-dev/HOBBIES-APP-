
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { Toast } from './components/common/Toast';
import { AvatarModal } from './components/modals/AvatarModal';
import { ImageModal } from './components/modals/ImageModal';
import { TabBar } from './components/layout/TabBar';
import WelcomeScreen from './screens/auth/WelcomeScreen';
import LoginScreen from './screens/auth/LoginScreen';
import CreateAccountScreen from './screens/auth/CreateAccountScreen';
import DiscoverScreen from './screens/main/DiscoverScreen';
import CreateScreen from './screens/main/CreateScreen';
import SocialScreen from './screens/main/SocialScreen';
import PointsScreen from './screens/main/PointsScreen';
import ProfileScreen from './screens/main/ProfileScreen';
import SettingsScreen from './screens/main/SettingsScreen';
import ChatScreen from './screens/main/ChatScreen';
import NewMessageScreen from './screens/main/NewMessageScreen';
import ChallengeScreen from './screens/main/ChallengeScreen';
import NotificationsScreen from './screens/main/NotificationsScreen';
import type { NavigationStackItem, User, Post, Message, Story, Challenge, DeckItem, Notification, EventRSVP } from './types';
import { FRIENDS_DATA, MESSAGES_DATA, INITIAL_HOBBY_DATA, STORIES_DATA, CHALLENGES_DATA, NOTIFICATIONS_DATA } from './constants';

const AppContent: React.FC = () => {
    const [navigationStack, setNavigationStack] = useState<NavigationStackItem[]>([{ view: 'welcome', props: {} }]);
    const [toastMessage, setToastMessage] = useState('');
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [hobbyData, setHobbyData] = useState(INITIAL_HOBBY_DATA);
    const [deckItems, setDeckItems] = useState<DeckItem[]>([
        { id: 101, title: 'Photography', points: 100, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800', color: '#4ade80', description: 'Capture stunning city views during the golden hour with a professional guide.', location: 'Cityscape Views', time: 'Fridays, 6-8pm', status: 'completed' },
        { id: 102, title: 'Painting', points: 100, image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=800', color: '#facc15', description: 'Join fellow artists for a relaxing afternoon of painting in the park.', location: 'Central Park', time: 'Sundays, 1-3pm', status: 'completed' },
        { id: 103, title: 'Yoga', points: 20, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800', color: '#a78bfa', description: 'Unwind and connect with nature in this outdoor yoga session.', location: 'Clifton Green', time: 'Mon & Wed, 6pm', status: 'completed' },
        { id: 104, title: 'Gardening', points: 25, image: 'https://images.unsplash.com/photo-1491147334573-44cbb4602074?q=80&w=800', color: '#34d399', description: 'Learn the basics of urban gardening and take home your own plant.', location: 'Community Garden', time: 'Saturdays, 10am', status: 'pending' },
    ]);
    const [messages, setMessages] = useState<Message[]>(MESSAGES_DATA);
    const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS_DATA);
    const [rsvps, setRsvps] = useState<EventRSVP[]>([]);
    const [currentUser, setCurrentUser] = useState<User>({
        id: 'currentUser', name: 'Hobbiest Owner', username: 'HobbiestCEO', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200', banner: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800', bio: 'Just a person exploring new hobbies and passions! Loving life and creating every day.', hobbies: ['Filmmaker', 'Traveling', 'Photography'], primaryHobby: { name: 'Filmmaker', descriptor: 'Creative' }, friendCount: 10, followerCount: '25k', friends: ['f1', 'f3'], pendingFriends: ['f2', 'f4'], outgoingRequests: [], posts: [], completedHobbies: 7,
        deck: [
            { id: 101, title: 'Photography', points: 100, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800', color: '#4ade80', status: 'completed', description: '', location: '', time: '' },
            { id: 102, title: 'Painting', points: 100, image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=800', color: '#facc15', status: 'completed', description: '', location: '', time: '' },
            { id: 105, title: 'Music Production', points: 75, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800', color: '#f87171', status: 'completed', description: '', location: '', time: '' },
        ],
        votedOn: ['sub1'],
    });

    const [posts, setPosts] = useState<Post[]>([
        { id: 'p6', userId: 'f6', user: 'lightchaser', text: 'Chasing the golden hour. Photography is my escape.', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800', likes: 259, liked: true, comments: [{ id: 1, user: 'shutterbug', text: 'Great shot' }, { id: 2, user: 'artlover', text: 'Love the colors' },], bookmarked: false },
        { id: 'p7', userId: 'f7', user: 'yogagirl', text: "Morning yoga session to start the day right! 🧘‍♀️", image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800', likes: 77, liked: false, comments: [], bookmarked: true },
        { id: 'p8', userId: 'f8', user: 'hikerlife', text: "Another mountain conquered! The view from the top was breathtaking. #hiking #adventure", image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=900', likes: 189, liked: false, comments: [], bookmarked: false },
        { id: 'p1', userId: 'f1', user: 'alexdoe', text: "Just finished a great hike this morning!", image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800', likes: 45, liked: false, comments: [] },
        { id: 'p2', userId: 'f2', user: 'janesmith', text: "My new painting. What do you guys think?", image: 'https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?q=80&w=800', likes: 102, liked: true, comments: [{ id: 1, user: 'You', text: 'Looks awesome!' }] },
    ]);
    const [stories, setStories] = useState<Story[]>(STORIES_DATA);
    const [challenges, setChallenges] = useState<Challenge[]>(CHALLENGES_DATA);
    const [expandedAvatar, setExpandedAvatar] = useState<string | null>(null);
    const [expandedPostImage, setExpandedPostImage] = useState<string | null>(null);
    const [newlyAddedDeckItemId, setNewlyAddedDeckItemId] = useState<string | number | null>(null);
    const [isDeckPulsing, setIsDeckPulsing] = useState(false);
    const socialTabRef = useRef<HTMLButtonElement>(null);

    const currentView = navigationStack[navigationStack.length - 1];
    
    const mainTabs = useMemo(() => ['discover', 'create', 'social', 'points', 'profile'], []);

    const navigateTo = (view: string, props: any = {}) => {
        setNavigationStack(prev => {
            const current = prev[prev.length - 1];

            // A view is a "main tab view" if its name is in mainTabs and it's not a specific user's profile
            const isCurrentViewMainTab = mainTabs.includes(current.view) && !current.props.userId;
            const isTargetViewMainTab = mainTabs.includes(view) && !props.userId;

            // If we are navigating between main tabs, replace the current one instead of pushing a new one.
            // This prevents building up a history of tab clicks (e.g., discover -> social -> discover).
            if (isCurrentViewMainTab && isTargetViewMainTab) {
                const newStack = prev.slice(0, -1);
                newStack.push({ view, props });
                return newStack;
            }
            
            // Otherwise, push the new view onto the stack.
            return [...prev, { view, props }];
        });
    };

    const goBack = () => {
        if (navigationStack.length > 1) {
            setNavigationStack(prev => prev.slice(0, -1));
        }
    };

    const allUsers = useMemo(() => [...FRIENDS_DATA, currentUser], [currentUser]);
    const friendRequests = useMemo(() => allUsers.filter(user => currentUser.pendingFriends?.includes(user.id)), [currentUser.pendingFriends, allUsers]);
    const outgoingRequestsUsers = useMemo(() => allUsers.filter(user => currentUser.outgoingRequests?.includes(user.id)), [currentUser.outgoingRequests, allUsers]);

    const friendshipStatus = useMemo(() => {
        const userId = currentView.props.userId;
        if (!userId || userId === currentUser.id) return 'self';
        if (currentUser.friends?.includes(userId)) return 'friends';
        if (currentUser.outgoingRequests?.includes(userId)) return 'pending_outgoing';
        if (currentUser.pendingFriends?.includes(userId)) return 'pending_incoming';
        return 'not_friends';
    }, [currentView.props.userId, currentUser]);

    const badgeCounts = useMemo(() => {
        const unreadMessages = messages.filter(m => m.unread).length;
        const pendingRequests = currentUser.pendingFriends?.length || 0;
        return { messages: unreadMessages, requests: pendingRequests, social: unreadMessages + pendingRequests };
    }, [messages, currentUser.pendingFriends]);

    const showToast = (message: string) => {
        setToastMessage(message);
        setIsToastVisible(true);
    };

    const handleCreateHobby = (newHobby: any) => {
        setHobbyData(prev => [newHobby, ...prev]);
        showToast('New hobby event created!');
    };

    const handleAddToDeck = (newHobby: any) => {
        const deckItem: DeckItem = {
            id: newHobby.id, title: newHobby.title || newHobby.t, points: newHobby.points || newHobby.pts, image: newHobby.thumb || newHobby.img || newHobby.image, color: '#8b5cf6', description: newHobby.description, location: newHobby.location, time: newHobby.time, status: 'pending', isMystery: newHobby.isMystery || false,
        };
        showToast(`Added ${deckItem.title} to your deck!`);
        setDeckItems(prev => [deckItem, ...prev.filter(item => item.id !== deckItem.id)]);
        setNewlyAddedDeckItemId(deckItem.id);
        setTimeout(() => setNewlyAddedDeckItemId(null), 1500);
        navigateTo('social', { initialTab: 'Deck' });
    };

    const handleRemoveFromDeck = (hobbyId: number | string) => {
        setDeckItems(prev => prev.filter(item => item.id !== hobbyId));
        showToast('Hobby removed from your deck.');
    };
    
    const handleReorderDeckItems = (reorderedItems: DeckItem[]) => {
        setDeckItems(reorderedItems);
        showToast("Hobbies reordered!");
    };

    const handleTabClick = (tab: string) => navigateTo(tab);
    const handleSignIn = () => navigateTo('discover');
    const handleViewChat = (userId: string) => {
        setMessages(prev => prev.map(msg => msg.userId === userId ? { ...msg, unread: false } : msg));
        navigateTo('chat', { userId });
    };

    const handleStartChat = (userId: string) => {
        const chatExists = messages.some(msg => msg.userId === userId);
        if (!chatExists) {
            const friend = allUsers.find(f => f.id === userId);
            if (friend) {
                setMessages(prev => [{ id: `m-${Date.now()}`, userId: friend.id, name: friend.name, avatar: friend.avatar, lastMessage: "Start the conversation!", unread: false, messages: [] }, ...prev]);
            }
        }
        handleViewChat(userId);
    };

    const handleChatMessage = (userId: string, text: string) => {
        const newMsg = { id: `cm-${Date.now()}`, senderId: 'currentUser', text, timestamp: Date.now(), read: false };
        setMessages(prev => prev.map(m => m.userId === userId ? { ...m, lastMessage: text, messages: [...(m.messages || []), newMsg] } : m));
    };

    const handleSendMessage = (friend: User, text: string) => {
        const newMsg = { id: `cm-${Date.now()}`, senderId: 'currentUser', text, timestamp: Date.now(), read: false };
        const existingChatIndex = messages.findIndex(m => m.userId === friend.id);
        if (existingChatIndex > -1) {
            setMessages(prev => {
                const newMessages = [...prev];
                const chat = { ...newMessages[existingChatIndex], lastMessage: text, unread: false, messages: [...(newMessages[existingChatIndex].messages || []), newMsg] };
                newMessages.splice(existingChatIndex, 1);
                newMessages.unshift(chat);
                return newMessages;
            });
        } else {
            setMessages(prev => [{ id: `m-${Date.now()}`, userId: friend.id, name: friend.name, avatar: friend.avatar, lastMessage: text, unread: false, messages: [newMsg] }, ...prev]);
        }
        goBack();
        showToast(`Message sent to ${friend.name}`);
    };

    const handleFriendAction = (action: string, targetUserId: string) => {
        let message = '';
        setCurrentUser(prevUser => {
            let newFriends = [...(prevUser.friends || [])];
            let newPending = [...(prevUser.pendingFriends || [])];
            let newOutgoing = [...(prevUser.outgoingRequests || [])];
            switch (action) {
                case 'add': newOutgoing.push(targetUserId); message = 'Friend request sent!'; break;
                case 'cancel': newOutgoing = newOutgoing.filter(id => id !== targetUserId); message = 'Friend request canceled.'; break;
                case 'decline': newPending = newPending.filter(id => id !== targetUserId); message = 'Friend request declined.'; break;
                case 'accept': newPending = newPending.filter(id => id !== targetUserId); newFriends.push(targetUserId); message = 'Friend request accepted!'; break;
                case 'unfriend': newFriends = newFriends.filter(id => id !== targetUserId); message = 'Friend removed.'; break;
                default: return prevUser;
            }
            return { ...prevUser, friends: newFriends, pendingFriends: newPending, outgoingRequests: newOutgoing };
        });
        showToast(message);
    };
    
    const handleUpdateUser = (updatedUser: User) => setCurrentUser(updatedUser);
    const handleToggleLike = (postId: string) => setPosts(p => p.map(post => post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post));
    const handleAddComment = (postId: string, text: string) => setPosts(p => p.map(post => post.id === postId ? { ...post, comments: [...post.comments, { id: Date.now(), user: 'You', text }] } : post));
    const handleNewPost = (text: string, image: string | null) => setPosts(p => [{ id: `p${Date.now()}`, userId: currentUser.id, user: currentUser.username, text, image: image || undefined, likes: 0, liked: false, comments: [], bookmarked: false }, ...p]);
    const handleToggleBookmark = (postId: string) => setPosts(p => p.map(post => post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post));
    const handleImageClick = (imageUrl: string) => setExpandedPostImage(imageUrl);
    
    const handleVote = (challengeId: string, submissionId: string) => {
        if (currentUser.votedOn?.includes(submissionId)) {
            showToast("You've already voted for this photo!");
            return;
        }
        setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, submissions: c.submissions.map(s => s.id === submissionId ? { ...s, votes: s.votes + 1 } : s) } : c));
        setCurrentUser(prev => ({ ...prev, votedOn: [...(prev.votedOn || []), submissionId] }));
    };

    const handleSubmitPhoto = (challengeId: string, imageUrl: string) => {
        setIsUploading(true);
        setTimeout(() => {
            const newSubmission = { id: `sub${Date.now()}`, userId: currentUser.id, image: imageUrl, votes: 0, comments: [] };
            setChallenges(prev => prev.map(c => c.id === challengeId ? { ...c, submissions: [newSubmission, ...c.submissions] } : c));
            setIsUploading(false);
            showToast("Your photo has been submitted!");
        }, 1500);
    };

    const handleRSVP = (hobbyId: number | string, status: 'going' | 'interested' | 'not_going') => {
        setRsvps(prev => {
            const existing = prev.findIndex(r => r.hobbyId === hobbyId);
            const entry: EventRSVP = { hobbyId, status, rsvpDate: Date.now() };
            if (existing > -1) {
                const updated = [...prev];
                updated[existing] = entry;
                return updated;
            }
            return [...prev, entry];
        });
        const labels = { going: "You're going!", interested: "Marked as interested", not_going: "RSVP removed" };
        showToast(labels[status]);
    };

    const handleMarkNotificationRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };
    const handleMarkAllNotificationsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };
    const handleNotificationAction = (notification: Notification) => {
        switch (notification.type) {
            case 'friend_request': navigateTo('social', { initialTab: 'Friends' }); break;
            case 'friend_accept': break;
            case 'challenge': break;
            case 'event_reminder': navigateTo('discover'); break;
            case 'hobby_suggestion': navigateTo('discover'); break;
            default: break;
        }
    };

    const unreadNotificationCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

    useEffect(() => {
        if (!isToastVisible) return;
        const timer = setTimeout(() => setIsToastVisible(false), 3000);
        return () => clearTimeout(timer);
    }, [isToastVisible]);

    const renderScreen = () => {
        const { view, props } = currentView;
        const onViewProfile = (userId: string) => navigateTo('profile', { userId });
        const onChallengeClick = (challengeId: string) => navigateTo('challenge', { challengeId });

        switch (view) {
            case 'welcome': return <WelcomeScreen onGoToLogin={() => navigateTo('login')} onGoToCreateAccount={() => navigateTo('createAccount')} />;
            case 'login': return <LoginScreen onSignIn={handleSignIn} onGoToCreateAccount={() => navigateTo('createAccount')} />;
            case 'createAccount': return <CreateAccountScreen onAccountCreate={handleSignIn} onBack={goBack} />;
            case 'discover': return <DiscoverScreen onBook={handleAddToDeck} showToast={showToast} deckItems={deckItems} animatingHobbyId={null} userHobbies={currentUser.hobbies} rsvps={rsvps} onRSVP={handleRSVP} />;
            case 'create': return <CreateScreen onBook={handleAddToDeck} hobbyData={hobbyData} onHobbyCreate={handleCreateHobby} deckItems={deckItems} animatingHobbyId={null} />;
            case 'social': return <SocialScreen onViewProfile={onViewProfile} deckItems={deckItems} onRemoveFromDeck={handleRemoveFromDeck} onReorderDeckItems={handleReorderDeckItems} messages={messages} onViewChat={handleViewChat} requests={friendRequests} outgoingRequests={outgoingRequestsUsers} onFriendAction={handleFriendAction} badgeCounts={badgeCounts} initialTab={props.initialTab} showToast={showToast} onComposeNew={() => navigateTo('newMessage')} onAvatarClick={setExpandedAvatar} newlyAddedDeckItemId={newlyAddedDeckItemId} allUsers={allUsers} posts={posts} onToggleLike={handleToggleLike} onAddComment={handleAddComment} onNewPost={handleNewPost} onToggleBookmark={handleToggleBookmark} onImageClick={handleImageClick} stories={stories} onStoryClick={() => {}} challenges={challenges} onChallengeClick={onChallengeClick} onNotifications={() => navigateTo('notifications')} unreadNotificationCount={unreadNotificationCount} />;
            case 'points': return <PointsScreen deckItems={deckItems} setDeckItems={setDeckItems} showToast={showToast} />;
            case 'profile': return <ProfileScreen userId={props.userId || currentUser.id} onBack={goBack} onMessage={handleStartChat} friendshipStatus={friendshipStatus} onFriendAction={handleFriendAction} onViewProfile={onViewProfile} allUsers={allUsers} currentUser={currentUser} onGoToSettings={() => navigateTo('settings')} posts={posts} onToggleLike={handleToggleLike} onAddComment={handleAddComment} onToggleBookmark={handleToggleBookmark} onImageClick={handleImageClick} onUpdateUser={handleUpdateUser} onAvatarClick={setExpandedAvatar} showToast={showToast} onNewPost={handleNewPost} />;
            case 'settings': return <SettingsScreen showToast={showToast} currentUser={currentUser} onUpdateUser={handleUpdateUser} onBack={goBack} />;
            case 'notifications': return <NotificationsScreen notifications={notifications} onBack={goBack} onMarkRead={handleMarkNotificationRead} onMarkAllRead={handleMarkAllNotificationsRead} onNotificationAction={handleNotificationAction} />;
            case 'chat': const chat = messages.find(msg => msg.userId === props.userId); return <ChatScreen chat={chat} onBack={goBack} onSendMessage={handleChatMessage} showToast={showToast} allUsers={allUsers} />;
            case 'newMessage': return <NewMessageScreen onBack={goBack} onSend={handleSendMessage} friends={FRIENDS_DATA} />;
            case 'challenge': return <ChallengeScreen challengeId={props.challengeId} onBack={goBack} allUsers={allUsers} challenges={challenges} onVote={handleVote} onSubmitPhoto={handleSubmitPhoto} currentUser={currentUser} showToast={showToast} />;
            default: return <WelcomeScreen onGoToLogin={() => navigateTo('login')} onGoToCreateAccount={() => navigateTo('createAccount')} />;
        }
    };

    const isAppView = useMemo(() => ['discover', 'create', 'social', 'points', 'profile'].includes(currentView.view), [currentView]);

    return (
        <div className="relative w-full h-full flex flex-col bg-background-primary">
            <Toast message={toastMessage} isVisible={isToastVisible} />
            <Toast message="Uploading..." isVisible={isUploading} />
            <AvatarModal imageUrl={expandedAvatar} onClose={() => setExpandedAvatar(null)} />
            <ImageModal imageUrl={expandedPostImage} onClose={() => setExpandedPostImage(null)} />
            <div className="flex-grow overflow-hidden">{renderScreen()}</div>
            {isAppView && (
                <TabBar activeTab={currentView.view} onTabClick={handleTabClick} badgeCounts={{ social: badgeCounts.social }} socialTabRef={socialTabRef} isDeckPulsing={isDeckPulsing} />
            )}
        </div>
    );
};

export default function App() {
    return (
        <SettingsProvider>
            <div className="bg-gray-200 min-h-screen flex items-center justify-center p-8 font-sans">
                <div
                    className="w-[430px] h-[880px] bg-gray-900 rounded-[60px] border-[10px] border-gray-800 shadow-2xl flex flex-col p-0.5"
                >
                    <div className="flex-grow bg-background-primary rounded-[50px] relative overflow-hidden flex flex-col">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[130px] h-[34px] bg-black rounded-full z-30" />
                        <AppContent />
                    </div>
                </div>
            </div>
        </SettingsProvider>
    );
}
