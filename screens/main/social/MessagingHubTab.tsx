
import React, { useState } from 'react';
import { PlusIcon } from '../../../components/common/Icons';
import type { Message, User } from '../../../types';

interface RequestsTabProps {
    requests: User[];
    outgoing: User[];
    onFriendAction: (action: string, userId: string) => void;
    onViewProfile: (userId: string) => void;
}

const RequestsTab: React.FC<RequestsTabProps> = ({ requests, outgoing, onFriendAction, onViewProfile }) => {
    const allRequests = [
        ...requests.map(r => ({ ...r, type: 'incoming' })),
        ...outgoing.map(r => ({ ...r, type: 'outgoing' }))
    ];

    if (allRequests.length === 0) {
        return <div className="text-center text-text-tertiary pt-16">No new friend requests.</div>;
    }

    return (
        <div className="pt-4 space-y-3">
            {allRequests.map(user => (
                <div key={user.id} className="bg-card rounded-xl p-3 flex items-center gap-4">
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="flex-grow cursor-pointer" onClick={() => onViewProfile(user.id)}>
                        <p className="font-semibold text-text-primary">{user.name}</p>
                        <p className="text-sm text-text-secondary">@{user.username}</p>
                    </div>
                    <div className="flex gap-2">
                        {user.type === 'incoming' ? (
                            <>
                                <button onClick={() => onFriendAction('accept', user.id)} className="bg-green-500 text-white font-bold px-3 py-1 rounded-lg text-sm">Accept</button>
                                <button onClick={() => onFriendAction('decline', user.id)} className="bg-gray-600 text-white font-bold px-3 py-1 rounded-lg text-sm">Decline</button>
                            </>
                        ) : (
                            <button onClick={() => onFriendAction('cancel', user.id)} className="bg-gray-600 text-white font-bold px-3 py-1 rounded-lg text-sm">Cancel</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

interface MessagesTabContentProps {
    messages: Message[];
    onViewChat: (userId: string) => void;
}

const MessagesTabContent: React.FC<MessagesTabContentProps> = ({ messages, onViewChat }) => (
    <div className="space-y-2">
        {messages.map(msg => (
            <div key={msg.id} onClick={() => onViewChat(msg.userId)} className="w-full bg-card rounded-xl p-3 flex items-center gap-4 cursor-pointer">
                <div className="relative">
                    <img src={msg.avatar} alt={msg.name} className="w-14 h-14 rounded-full object-cover" />
                    {msg.unread && <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-accent ring-2 ring-black" />}
                </div>
                <div className="flex-grow overflow-hidden">
                    <p className="font-bold text-text-primary truncate">{msg.name}</p>
                    <p className={`text-sm truncate ${msg.unread ? 'text-text-primary' : 'text-text-tertiary'}`}>{msg.lastMessage}</p>
                </div>
            </div>
        ))}
    </div>
);

interface MessagingHubTabProps {
    messages: Message[];
    onViewChat: (userId: string) => void;
    requests: User[];
    outgoingRequests: User[];
    onFriendAction: (action: string, userId: string) => void;
    onComposeNew: () => void;
    badgeCounts: { messages: number; requests: number };
    onViewProfile: (userId: string) => void;
}

const MessagingHubTab: React.FC<MessagingHubTabProps> = ({ messages, onViewChat, requests, outgoingRequests, onFriendAction, onComposeNew, badgeCounts, onViewProfile }) => {
    const [activeInnerTab, setActiveInnerTab] = useState('Messages');

    const InnerTabButton: React.FC<{ name: string; badgeCount: number }> = ({ name, badgeCount }) => (
        <button
            onClick={() => setActiveInnerTab(name)}
            className={`relative w-full text-center py-2 rounded-full text-sm font-semibold transition-colors ${activeInnerTab === name ? 'bg-background-tertiary text-text-primary' : 'text-text-secondary hover:text-text-primary'}`}
        >
            {name}
            {badgeCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {badgeCount}
                </span>
            )}
        </button>
    );

    return (
        <div className="pt-4">
            <div className="flex justify-between items-center mb-4">
                <div className="p-1 bg-card rounded-full flex justify-between items-center gap-1 flex-grow">
                    <InnerTabButton name="Messages" badgeCount={badgeCounts.messages} />
                    <InnerTabButton name="Requests" badgeCount={badgeCounts.requests} />
                </div>
                <button onClick={onComposeNew} className="ml-4 bg-accent text-accent-text rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <PlusIcon className="w-6 h-6" />
                </button>
            </div>
            {activeInnerTab === 'Messages' && <MessagesTabContent messages={messages} onViewChat={onViewChat} />}
            {activeInnerTab === 'Requests' && <RequestsTab requests={requests} outgoing={outgoingRequests} onFriendAction={onFriendAction} onViewProfile={onViewProfile} />}
        </div>
    );
};

export default MessagingHubTab;
