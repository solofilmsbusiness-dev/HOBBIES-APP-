
import React, { useMemo } from 'react';
import type { DeckItem } from '../../types';

interface PointsScreenProps {
    deckItems: DeckItem[];
    setDeckItems: React.Dispatch<React.SetStateAction<DeckItem[]>>;
    showToast: (message: string) => void;
}

const PointsScreen: React.FC<PointsScreenProps> = ({ deckItems, setDeckItems, showToast }) => {
    const totalPoints = useMemo(() => {
        return deckItems.reduce((sum, item) => sum + (item.points || 0), 0);
    }, [deckItems]);

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
                <div className="text-center">
                    <h1 className="text-4xl" style={{ fontFamily: '"Lobster", cursive' }}>
                        Your Points
                    </h1>
                </div>
                <div className="my-8 text-center">
                    <p className="text-6xl font-bold text-yellow-400">{totalPoints}</p>
                    <p className="text-text-secondary">Total Points Balance</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
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
                    <h2 className="text-xl font-bold mb-4">Marketplace</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {MARKETPLACE_ITEMS.map(item => (
                            <div key={item.id} className="bg-card rounded-xl p-4 flex flex-col items-center">
                                <img src={item.image} alt={item.title} className="w-20 h-20 rounded-lg object-cover mb-4" />
                                <p className="font-semibold text-center">{item.title}</p>
                                <p className="text-sm text-yellow-400 mb-4">{item.cost} pts</p>
                                <button
                                    onClick={() => handleRedeem(item)}
                                    className="w-full bg-yellow-500 text-black font-bold py-2 rounded-full hover:bg-yellow-400 transition-colors text-sm"
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
