
import React, { useState } from 'react';
import { DeckCard } from '../../../components/deck/DeckCard';
import type { DeckItem } from '../../../types';

interface DeckTabProps {
    deckItems: DeckItem[];
    onRemoveItem: (id: string | number) => void;
    onReorderItems: (items: DeckItem[]) => void;
    newlyAddedDeckItemId: string | number | null;
    showToast: (message: string) => void;
}

const DeckTab: React.FC<DeckTabProps> = ({ deckItems, onRemoveItem, onReorderItems, newlyAddedDeckItemId, showToast }) => {
    const [draggedItemId, setDraggedItemId] = useState<string | number | null>(null);

    const handleDragStart = (e: React.DragEvent, id: string | number) => {
        setDraggedItemId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, targetId: string | number) => {
        e.preventDefault();
        if (draggedItemId === null || draggedItemId === targetId) {
            setDraggedItemId(null);
            return;
        }

        const reorderedItems = [...deckItems];
        const draggedItemIndex = reorderedItems.findIndex(item => item.id === draggedItemId);
        const targetItemIndex = reorderedItems.findIndex(item => item.id === targetId);

        const [draggedItem] = reorderedItems.splice(draggedItemIndex, 1);
        reorderedItems.splice(targetItemIndex, 0, draggedItem);

        onReorderItems(reorderedItems);
        setDraggedItemId(null);
    };

    const handleDragEnd = () => {
        setDraggedItemId(null);
    };

    return (
        <div className="grid grid-cols-2 gap-3 pt-4" onDragOver={handleDragOver}>
            {deckItems.map((deck) => (
                <div
                    key={deck.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, deck.id)}
                    onDrop={(e) => handleDrop(e, deck.id)}
                    onDragEnd={handleDragEnd}
                    className={`transition-opacity ${draggedItemId === deck.id ? 'opacity-50' : ''}`}
                >
                    <DeckCard hobby={deck} onRemove={onRemoveItem} isNew={deck.id === newlyAddedDeckItemId} showToast={showToast} />
                </div>
            ))}
        </div>
    );
};

export default DeckTab;
