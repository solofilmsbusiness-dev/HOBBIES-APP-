
import React, { useState } from 'react';
import type { Notification } from '../../types';

interface NotificationsScreenProps {
    notifications: Notification[];
    onBack: () => void;
    onMarkRead: (id: string) => void;
    onMarkAllRead: () => void;
    onNotificationAction: (notification: Notification) => void;
}

const timeAgo = (ts: number): string => {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
};

const typeIcon: Record<string, { emoji: string; color: string }> = {
    like: { emoji: '❤️', color: 'bg-red-500/20' },
    comment: { emoji: '💬', color: 'bg-blue-500/20' },
    friend_request: { emoji: '👋', color: 'bg-accent/20' },
    friend_accept: { emoji: '🤝', color: 'bg-green-500/20' },
    challenge: { emoji: '🏆', color: 'bg-amber-500/20' },
    event_reminder: { emoji: '📅', color: 'bg-purple-500/20' },
    hobby_suggestion: { emoji: '✨', color: 'bg-accent/20' },
};

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ notifications, onBack, onMarkRead, onMarkAllRead, onNotificationAction }) => {
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const unreadCount = notifications.filter(n => !n.read).length;
    const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

    const today: Notification[] = [];
    const earlier: Notification[] = [];
    const dayMs = 86400000;

    filtered.forEach(n => {
        if (Date.now() - n.timestamp < dayMs) today.push(n);
        else earlier.push(n);
    });

    const renderNotification = (n: Notification) => {
        const icon = typeIcon[n.type] || { emoji: '🔔', color: 'bg-accent/20' };
        return (
            <button
                key={n.id}
                onClick={() => { onMarkRead(n.id); onNotificationAction(n); }}
                className={`w-full flex items-start gap-3 p-3 rounded-2xl transition-colors text-left ${!n.read ? 'bg-accent/5' : 'hover:bg-background-secondary'}`}
            >
                {n.avatar ? (
                    <div className="relative flex-shrink-0">
                        <img src={n.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
                        <span className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full ${icon.color} flex items-center justify-center text-[10px]`}>{icon.emoji}</span>
                    </div>
                ) : (
                    <div className={`w-11 h-11 rounded-full ${icon.color} flex items-center justify-center text-lg flex-shrink-0`}>{icon.emoji}</div>
                )}
                <div className="flex-grow min-w-0">
                    <p className={`text-sm leading-snug ${!n.read ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}>{n.title}</p>
                    <p className="text-xs text-text-tertiary mt-0.5 truncate">{n.body}</p>
                    <p className="text-[10px] text-text-tertiary mt-1">{timeAgo(n.timestamp)}</p>
                </div>
                {!n.read && <span className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0 mt-1.5" />}
            </button>
        );
    };

    return (
        <div className="relative w-full h-full bg-background-primary text-text-primary flex flex-col">
            <header className="p-4 pt-12 border-b border-border bg-background-primary z-10">
                <div className="flex items-center justify-between mb-3">
                    <button onClick={onBack} className="text-text-primary font-bold text-2xl">&larr;</button>
                    {unreadCount > 0 && (
                        <button onClick={onMarkAllRead} className="text-accent text-xs font-semibold">Mark all read</button>
                    )}
                </div>
                <span className="badge-pill mb-2 inline-flex">Activity</span>
                <h1 className="text-2xl font-black" style={{ fontFamily: '"Inter", sans-serif' }}>Notifications</h1>
                <div className="flex gap-2 mt-3">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${filter === 'all' ? 'bg-accent/15 text-accent' : 'bg-background-secondary text-text-secondary'}`}
                    >All</button>
                    <button
                        onClick={() => setFilter('unread')}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${filter === 'unread' ? 'bg-accent/15 text-accent' : 'bg-background-secondary text-text-secondary'}`}
                    >
                        Unread{unreadCount > 0 && ` (${unreadCount})`}
                    </button>
                </div>
            </header>

            <main className="flex-grow overflow-y-auto px-4 py-3 pb-24" style={{ scrollbarWidth: 'none' }}>
                {filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <span className="text-4xl mb-3">🔔</span>
                        <p className="text-text-secondary text-sm">No notifications yet</p>
                        <p className="text-text-tertiary text-xs mt-1">We'll let you know when something happens!</p>
                    </div>
                )}

                {today.length > 0 && (
                    <>
                        <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-2 px-1">Today</p>
                        <div className="space-y-1 mb-4">{today.map(renderNotification)}</div>
                    </>
                )}

                {earlier.length > 0 && (
                    <>
                        <p className="text-xs font-bold text-text-tertiary uppercase tracking-wider mb-2 px-1">Earlier</p>
                        <div className="space-y-1">{earlier.map(renderNotification)}</div>
                    </>
                )}
            </main>
        </div>
    );
};

export default NotificationsScreen;
