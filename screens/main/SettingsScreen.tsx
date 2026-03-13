
import React, { useState } from 'react';
import type { User } from '../../types';

interface SettingsScreenProps {
    showToast: (message: string) => void;
    currentUser: User;
    onUpdateUser: (user: User) => void;
    onBack: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ showToast, currentUser, onUpdateUser, onBack }) => {
    const [user, setUser] = useState(currentUser);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateUser(user);
        showToast("Profile updated successfully!");
    };

    return (
        <div className="relative w-full h-full bg-background-primary text-text-primary">
            <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-10" alt="Hobby background" />
            <button onClick={onBack} className="absolute top-6 left-6 z-20 text-text-primary text-3xl leading-none font-bold">&larr;</button>
            <main className="relative z-10 overflow-y-auto p-4 pt-12 pb-24 h-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl" style={{ fontFamily: '"Lobster", cursive' }}>Settings</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto">
                    <div>
                        <label className="text-sm text-text-secondary">Username</label>
                        <input type="text" name="username" value={user.username} onChange={handleInputChange} className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <div>
                        <label className="text-sm text-text-secondary">Display Name</label>
                        <input type="text" name="name" value={user.name} onChange={handleInputChange} className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <div>
                        <label className="text-sm text-text-secondary">Bio</label>
                        <textarea name="bio" value={user.bio} onChange={handleInputChange} rows={3} maxLength={160} className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-primary-button text-primary-button-text font-bold py-4 rounded-full hover:bg-primary-button-hover transition-colors">
                        Save Changes
                    </button>
                </form>
            </main>
        </div>
    );
};

export default SettingsScreen;
