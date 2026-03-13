
import React, { useState } from 'react';
import { HobbyChip } from '../../components/common/HobbyChip';
import type { Message, User } from '../../types';

interface ChatScreenProps {
    chat: Message | undefined;
    onBack: () => void;
    showToast: (message: string) => void;
    allUsers: User[];
}

const ChatScreen: React.FC<ChatScreenProps> = ({ chat, onBack, showToast, allUsers }) => {
    const user = allUsers.find(f => f.id === chat?.userId);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleBlock = () => {
        if (user) {
            showToast(`${user.name} has been blocked.`);
            setMenuOpen(false);
        }
    };

    const handleDelete = () => {
        if (user) {
            showToast(`Chat with ${user.name} deleted.`);
            setMenuOpen(false);
            onBack();
        }
    };

    if (!user || !chat) {
        return (
            <div className="w-full h-full bg-background-primary text-text-primary p-8 flex flex-col items-center justify-center">
                <p>User not found.</p>
                <button onClick={onBack} className="mt-4 bg-primary-button text-primary-button-text font-bold py-2 px-4 rounded-full">Back</button>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-background-primary text-text-primary flex flex-col pt-10">
            <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-10" alt="Hobby background" />
            <header className="relative z-10 flex items-center p-4 border-b border-border">
                <button onClick={onBack} className="text-text-primary font-bold text-2xl">&larr;</button>
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover mx-4" />
                <div className="flex-grow">
                    <h2 className="font-bold text-lg">{user.name}</h2>
                    <HobbyChip user={user} isClickable={false} />
                </div>
                <div className="relative">
                    <button onClick={() => setMenuOpen(v => !v)} className="text-text-primary font-bold text-2xl">⋮</button>
                    {menuOpen && (
                        <div className="absolute top-full right-0 mt-2 w-40 bg-card rounded-lg shadow-lg z-20">
                            <button onClick={handleBlock} className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background-secondary">Block User</button>
                            <button onClick={handleDelete} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-background-secondary">Delete Chat</button>
                        </div>
                    )}
                </div>
            </header>
            <main className="flex-grow p-4 flex flex-col space-y-4">
                <div className="flex items-end gap-2">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                    <div className="bg-background-secondary rounded-lg p-3 max-w-xs">
                        <p className="text-sm">{chat.lastMessage}</p>
                    </div>
                </div>
                <div className="flex items-end gap-2 justify-end">
                    <div className="bg-accent text-accent-text rounded-lg p-3 max-w-xs">
                        <p className="text-sm">Sounds good! See you then.</p>
                    </div>
                </div>
            </main>
            <footer className="relative z-10 p-4 border-t border-border">
                <div className="flex items-center gap-2 bg-card rounded-full p-1 border border-border">
                    <input type="text" placeholder="Type a message..." className="flex-grow bg-transparent px-4 py-2 focus:outline-none placeholder-text-tertiary" />
                    <button className="bg-primary-button text-primary-button-text font-semibold py-2 px-4 rounded-full hover:bg-primary-button-hover transition-colors">Send</button>
                </div>
            </footer>
        </div>
    );
};

export default ChatScreen;
