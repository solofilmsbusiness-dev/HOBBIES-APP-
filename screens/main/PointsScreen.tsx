
import React, { useMemo } from 'react';
import type { DeckItem } from '../../types';

interface PointsScreenProps {
    deckItems: DeckItem[];
    setDeckItems: React.Dispatch<React.SetStateAction<DeckItem[]>>;
    showToast: (message: string) => void;
}

const ACHIEVEMENTS = [
    { id: 'a1', icon: '🎯', label: 'First Hobby', earned: true },
    { id: 'a2', icon: '🦋', label: 'Social Butterfly', earned: true },
    { id: 'a3', icon: '🔥', label: 'Week Warrior', earned: true },
    { id: 'a4', icon: '🏆', label: 'Top Collector', earned: false },
    { id: 'a5', icon: '⭐', label: 'Rising Star', earned: false },
    { id: 'a6', icon: '🎨', label: 'Creative Soul', earned: true },
];

const PointsScreen: React.FC<PointsScreenProps> = ({ deckItems, setDeckItems, showToast }) => {
    const totalPoints = useMemo(() => {
        return deckItems.reduce((sum, item) => sum + (item.points || 0), 0);
    }, [deckItems]);

    const level = Math.floor(totalPoints / 100) + 1;
    const progressToNext = (totalPoints % 100);

    const MARKETPLACE_ITEMS = [
        { id: 'm1', title: 'Paint Brushes', cost: 50, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=200' },
        { id: 'm2', title: 'Camera Lens', cost: 150, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=200' },
        { id: 'm3', title: 'Yoga Mat', cost: 75, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=200' },
    ];

    const handleRedeem = (item: { title: string; cost: number; }) => {
        if (totalPoints >= item.cost) {
            const redeemedItem: DeckItem = {
                id: `redeemed-${Date.now()}`,
                title: `Redeemed: ${item.title}`,
                points: -item.cost,
                status: 'redeemed',
                image: '', color: '', description: '', location: '', time: ''
            };
            setDeckItems(prevItems => [...prevItems, redeemedItem]);
            showToast(`You redeemed ${item.title}!`);
        } else {
            showToast("Not enough points!");
        }
    };

    return (
        <div className="w-full h-full bg-background-primary text-text-primary">
            <main className="overflow-y-auto p-4 pt-12 pb-24 h-full">
                <div className="mb-6">
                    <span className="badge-pill mb-3 inline-flex">Rewards</span>
                    <h1 className="text-3xl font-black" style={{ fontFamily: '"Inter", sans-serif' }}>Your Points</h1>
                </div>

                <div className="bg-card rounded-2xl p-6 mb-6 neon-glow">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-5xl font-black text-accent">{totalPoints}</p>
                            <p className="text-text-tertiary text-sm mt-1">Total Points Balance</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-2xl">🔥</span>
                                <span className="text-lg font-bold text-accent">7 Day Streak</span>
                            </div>
                            <p className="text-xs text-text-tertiary">Keep it going!</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-accent">Lvl {level}</span>
                        <div className="flex-grow h-2 bg-background-tertiary rounded-full overflow-hidden">
                            <div
                                className="h-full bg-accent rounded-full transition-all duration-500"
                                style={{ width: `${progressToNext}%` }}
                            />
                        </div>
                        <span className="text-sm text-text-tertiary">Lvl {level + 1}</span>
                    </div>
                </div>

                <div className="mb-6">
                    <h2 className="text-lg font-bold mb-3">Achievements</h2>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {ACHIEVEMENTS.map(badge => (
                            <div key={badge.id} className={`flex-shrink-0 flex flex-col items-center gap-1 w-16 ${!badge.earned ? 'opacity-30' : ''}`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${badge.earned ? 'bg-accent/20 animate-neon-pulse' : 'bg-background-tertiary'}`}>
                                    {badge.icon}
                                </div>
                                <span className="text-[10px] text-text-secondary text-center leading-tight">{badge.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-bold mb-3">Recent Activity</h2>
                    <div className="space-y-3">
                        {[...deckItems].reverse().map(item => {
                            const isHolographic = (item.points >= 100 || item.isMystery) && (item.status === 'completed');
                            const itemClasses = `bg-card rounded-xl p-4 flex justify-between items-center ${isHolographic ? 'holographic-border' : ''}`;
                            return (
                                <div key={item.id} className={itemClasses}>
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-text-secondary">
                                            {item.status === 'completed' ? 'Completed' : item.status === 'redeemed' ? 'Redeemed' : 'Pending'}
                                        </p>
                                    </div>
                                    <p className={`text-lg font-bold ${item.points > 0 ? 'text-green-400' : 'text-red-400'}`}>{item.points > 0 ? '+' : ''}{item.points} pts</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-lg font-bold mb-3">Marketplace</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {MARKETPLACE_ITEMS.map(item => (
                            <div key={item.id} className="bg-card rounded-2xl p-4 flex flex-col items-center hover-lift">
                                <img src={item.image} alt={item.title} className="w-20 h-20 rounded-xl object-cover mb-3" />
                                <p className="font-semibold text-center text-sm">{item.title}</p>
                                <p className="text-sm text-accent mb-3">{item.cost} pts</p>
                                <button
                                    onClick={() => handleRedeem(item)}
                                    className="w-full bg-primary-button text-primary-button-text font-bold py-2 rounded-full hover:bg-primary-button-hover transition-colors text-sm"
                                >
                                    Redeem
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PointsScreen;
