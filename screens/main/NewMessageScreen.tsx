
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
        <div className="relative w-full h-full bg-background-primary text-text-primary flex flex-col">
            <header className="p-4 pt-12 border-b border-white/5">
                <div className="flex items-center justify-between mb-3">
                    <button onClick={onBack} className="text-text-primary font-bold text-2xl">&larr;</button>
                </div>
                <span className="badge-pill mb-2 inline-flex">New Conversation</span>
                <h1 className="text-2xl font-black" style={{ fontFamily: '"Inter", sans-serif' }}>New Message</h1>
            </header>
            <main className="flex-grow p-4 flex flex-col overflow-hidden">
                <div className="mb-4">
                    <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-text-tertiary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search for a friend..."
                            className="flex-grow bg-transparent focus:outline-none placeholder-text-tertiary text-sm"
                        />
                        {searchText && (
                            <button onClick={() => setSearchText('')} className="text-text-tertiary hover:text-text-primary text-lg leading-none">×</button>
                        )}
                    </div>
                </div>
                {!selectedFriend ? (
                    <div className="flex-grow overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                        {filteredFriends.map(friend => (
                            <div key={friend.id} onClick={() => setSelectedFriend(friend)} className="w-full bg-card rounded-2xl border border-white/5 p-3 flex items-center gap-3 cursor-pointer mb-2 hover:border-white/10 transition-colors">
                                <div className="relative">
                                    <img src={friend.avatar} alt={friend.name} className="w-11 h-11 rounded-full object-cover" />
                                    {parseInt(friend.id.replace('f', '')) % 3 !== 0 && (
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-card" />
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-bold text-sm text-text-primary">{friend.name}</p>
                                    <p className="text-xs text-text-tertiary">@{friend.username}</p>
                                </div>
                                <span className="text-[10px] text-text-tertiary bg-white/5 px-2 py-0.5 rounded-full border border-white/10">{friend.primaryHobby?.name || 'Hobbyist'}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-grow flex flex-col">
                        <div className="w-full bg-card rounded-2xl border border-white/5 p-3 flex items-center gap-3 mb-4">
                            <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">To:</span>
                            <img src={selectedFriend.avatar} alt={selectedFriend.name} className="w-8 h-8 rounded-full object-cover" />
                            <p className="font-bold text-sm text-text-primary">{selectedFriend.name}</p>
                            <button onClick={() => setSelectedFriend(null)} className="ml-auto text-red-400 font-bold hover:text-red-300 transition-colors">×</button>
                        </div>
                        <textarea
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            placeholder={`Message ${selectedFriend.name}...`}
                            className="w-full flex-grow bg-white/5 border border-white/10 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 transition-all text-sm placeholder-text-tertiary"
                        />
                    </div>
                )}
            </main>
            <footer className="p-4 border-t border-white/5">
                <button
                    onClick={handleSend}
                    disabled={!selectedFriend || !messageText.trim()}
                    className="w-full bg-primary-button text-primary-button-text font-black py-3 rounded-2xl neon-glow hover:bg-primary-button-hover transition-all disabled:opacity-30 disabled:shadow-none text-sm tracking-wide"
                >
                    Send Message
                </button>
            </footer>
        </div>
    );
};

export default NewMessageScreen;
