
import React, { useState, useMemo } from 'react';
import type { User } from '../../types';

interface NewMessageScreenProps {
    onBack: () => void;
    onSend: (friend: User, text: string) => void;
    friends: User[];
}

const NewMessageScreen: React.FC<NewMessageScreenProps> = ({ onBack, onSend, friends }) => {
    const [searchText, setSearchText] = useState('');
    const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
    const [messageText, setMessageText] = useState('');

    const filteredFriends = useMemo(() => {
        if (!searchText) return friends;
        return friends.filter(friend =>
            friend.name.toLowerCase().includes(searchText.toLowerCase()) ||
            friend.username.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [searchText, friends]);

    const handleSend = () => {
        if (selectedFriend && messageText.trim()) {
            onSend(selectedFriend, messageText);
        }
    };

    return (
        <div className="relative w-full h-full bg-background-primary text-text-primary flex flex-col pt-10">
            <header className="relative z-10 flex items-center p-4 border-b border-border">
                <button onClick={onBack} className="text-text-primary font-bold text-2xl">&larr;</button>
                <h2 className="font-bold text-lg flex-grow text-center">New Message</h2>
                <div className="w-8"></div>
            </header>
            <main className="flex-grow p-4 flex flex-col">
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search for a friend..."
                        className="w-full bg-background-secondary border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>
                {!selectedFriend ? (
                    <div className="flex-grow overflow-y-auto">
                        {filteredFriends.map(friend => (
                            <div key={friend.id} onClick={() => setSelectedFriend(friend)} className="w-full bg-card rounded-xl p-3 flex items-center gap-4 cursor-pointer mb-2">
                                <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <p className="font-semibold text-text-primary">{friend.name}</p>
                                    <p className="text-sm text-text-secondary">@{friend.username}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-grow flex flex-col">
                        <div className="w-full bg-card rounded-xl p-3 flex items-center gap-4 mb-4">
                            <span className="text-text-secondary">To:</span>
                            <img src={selectedFriend.avatar} alt={selectedFriend.name} className="w-8 h-8 rounded-full object-cover" />
                            <p className="font-semibold text-text-primary">{selectedFriend.name}</p>
                            <button onClick={() => setSelectedFriend(null)} className="ml-auto text-red-500 font-bold">×</button>
                        </div>
                        <textarea
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder={`Message ${selectedFriend.name}...`}
                            className="w-full flex-grow bg-background-secondary border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                )}
            </main>
            <footer className="relative z-10 p-4 border-t border-border">
                <button
                    onClick={handleSend}
                    disabled={!selectedFriend || !messageText.trim()}
                    className="w-full bg-primary-button text-primary-button-text font-bold py-3 rounded-full hover:bg-primary-button-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </footer>
        </div>
    );
};

export default NewMessageScreen;
