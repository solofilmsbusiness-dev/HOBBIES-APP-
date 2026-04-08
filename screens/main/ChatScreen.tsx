
import React, { useState, useRef, useEffect } from 'react';
import { HobbyChip } from '../../components/common/HobbyChip';
import type { Message, User, ChatMessage } from '../../types';

interface ChatScreenProps {
    chat: Message | undefined;
    onBack: () => void;
    onSendMessage: (userId: string, text: string) => void;
    showToast: (message: string) => void;
    allUsers: User[];
}

const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatScreen: React.FC<ChatScreenProps> = ({ chat, onBack, onSendMessage, showToast, allUsers }) => {
    const user = allUsers.find(f => f.id === chat?.userId);
    const [menuOpen, setMenuOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chat?.messages]);

    useEffect(() => {
        if (chat?.messages && chat.messages.length > 0) {
            const lastMsg = chat.messages[chat.messages.length - 1];
            if (lastMsg.senderId === 'currentUser') {
                setIsTyping(true);
                const timer = setTimeout(() => setIsTyping(false), 2000);
                return () => clearTimeout(timer);
            }
        }
    }, [chat?.messages?.length]);

    const handleSend = () => {
        const text = inputText.trim();
        if (!text || !chat) return;
        onSendMessage(chat.userId, text);
        setInputText('');
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
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

    const chatMessages = chat.messages || [];

    return (
        <div className="relative w-full h-full bg-background-primary text-text-primary flex flex-col">
            {/* Header */}
            <header className="flex items-center p-4 pt-12 border-b border-white/5 bg-background-primary z-10">
                <button onClick={onBack} className="text-text-primary font-bold text-2xl mr-3">&larr;</button>
                <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 ring-2 ring-background-primary" />
                </div>
                <div className="ml-3 flex-grow">
                    <h2 className="font-black text-base" style={{ fontFamily: '"Inter", sans-serif' }}>{user.name}</h2>
                    <div className="flex items-center gap-2">
                        <HobbyChip user={user} isClickable={false} />
                        {isTyping && <span className="text-[10px] text-accent animate-pulse">typing...</span>}
                    </div>
                </div>
                <div className="relative">
                    <button onClick={() => setMenuOpen(v => !v)} className="text-text-secondary font-bold text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background-secondary">⋮</button>
                    {menuOpen && (
                        <div className="absolute top-full right-0 mt-1 w-40 bg-card border border-white/10 rounded-2xl shadow-lg z-20 overflow-hidden">
                            <button onClick={() => { showToast(`${user.name} has been blocked.`); setMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-sm text-text-primary hover:bg-background-secondary transition-colors">Block User</button>
                            <button onClick={() => { showToast(`Chat with ${user.name} deleted.`); setMenuOpen(false); onBack(); }} className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-background-secondary transition-colors">Delete Chat</button>
                        </div>
                    )}
                </div>
            </header>

            {/* Messages */}
            <main className="flex-grow overflow-y-auto px-4 py-4 space-y-1" style={{ scrollbarWidth: 'none' }}>
                {chatMessages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover mb-3" />
                        <p className="font-bold text-lg">{user.name}</p>
                        <p className="text-text-tertiary text-sm mt-1">Start your conversation!</p>
                    </div>
                )}
                {chatMessages.map((msg, idx) => {
                    const isMe = msg.senderId === 'currentUser';
                    const showAvatar = !isMe && (idx === 0 || chatMessages[idx - 1].senderId !== msg.senderId);
                    const isLast = idx === chatMessages.length - 1 || chatMessages[idx + 1].senderId !== msg.senderId;

                    return (
                        <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'} ${isLast ? 'mb-3' : 'mb-0.5'}`}>
                            {!isMe && (
                                <div className="w-7 flex-shrink-0">
                                    {showAvatar && <img src={user.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />}
                                </div>
                            )}
                            <div className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed ${isMe
                                ? 'bg-accent text-black rounded-2xl rounded-br-md'
                                : 'bg-background-secondary rounded-2xl rounded-bl-md'
                            }`}>
                                <p>{msg.text}</p>
                            </div>
                            {isMe && isLast && (
                                <div className="flex flex-col items-end text-[9px] text-text-tertiary leading-none mr-1 flex-shrink-0">
                                    <span>{formatTime(msg.timestamp)}</span>
                                    <span className={msg.read ? 'text-accent' : ''}>{msg.read ? '✓✓' : '✓'}</span>
                                </div>
                            )}
                        </div>
                    );
                })}

                {isTyping && (
                    <div className="flex items-end gap-2 mb-3">
                        <img src={user.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                        <div className="bg-background-secondary rounded-2xl rounded-bl-md px-4 py-3">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>

            {/* Input */}
            <footer className="p-3 border-t border-white/5 bg-background-primary">
                <div className="flex items-center gap-2 bg-white/5 rounded-2xl px-4 py-2 border border-white/10 focus-within:border-accent/40 focus-within:ring-1 focus-within:ring-accent/20 transition-all">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-grow bg-transparent focus:outline-none placeholder-text-tertiary text-sm py-1"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputText.trim()}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${inputText.trim() ? 'bg-accent text-black neon-glow' : 'bg-background-tertiary text-text-tertiary'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19V5m0 0l-7 7m7-7l7 7" />
                        </svg>
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ChatScreen;
