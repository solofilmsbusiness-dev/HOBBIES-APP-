
import React from 'react';

interface LoginScreenProps {
    onSignIn: () => void;
    onGoToCreateAccount: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onSignIn, onGoToCreateAccount }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSignIn();
    };

    return (
        <div className="relative w-full h-full bg-background-primary text-text-primary">
            <div className="absolute top-14 right-6 w-2.5 h-2.5 rounded-full bg-accent opacity-70 animate-neon-pulse" />
            <div className="relative z-10 p-8 flex flex-col justify-center h-full">
                <div className="mb-10">
                    <span className="badge-pill mb-6 inline-flex">Welcome Back</span>
                    <h1 className="text-5xl font-black leading-tight mt-4" style={{ fontFamily: '"Inter", sans-serif' }}>
                        Sign into<br />
                        <span className="text-accent">Hobbiest</span>
                    </h1>
                    <p className="text-sm text-text-tertiary mt-2">Pick up where you left off.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-xs font-bold tracking-widest text-text-secondary uppercase">Email</label>
                        <input type="email" required placeholder="your@email.com" className="w-full bg-background-secondary border border-border rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                    </div>
                    <div>
                        <label className="text-xs font-bold tracking-widest text-text-secondary uppercase">Password</label>
                        <input type="password" required placeholder="••••••••" className="w-full bg-background-secondary border border-border rounded-xl p-4 mt-2 focus:outline-none focus:ring-2 focus:ring-accent transition-all" />
                    </div>
                    <button type="submit" className="w-full bg-primary-button text-primary-button-text font-bold py-4 rounded-2xl neon-glow hover:bg-primary-button-hover transition-all mt-2">
                        Log In
                    </button>
                </form>
                <div className="text-center mt-8">
                    <p className="text-sm text-text-secondary">
                        Don't have an account?{' '}
                        <button onClick={onGoToCreateAccount} className="font-bold text-accent hover:underline">
                            Create one
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
