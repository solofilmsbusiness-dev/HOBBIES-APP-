
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
            <img src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-10" alt="Hobby background" />
            <div className="relative z-10 p-8 flex flex-col justify-center h-full">
                <div className="text-center mb-10">
                    <h1 className="text-5xl" style={{ fontFamily: '"Lobster", cursive' }}>Welcome Back</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-sm text-text-secondary">Email</label>
                        <input type="email" required placeholder="your@email.com" className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <div>
                        <label className="text-sm text-text-secondary">Password</label>
                        <input type="password" required placeholder="••••••••" className="w-full bg-background-secondary border border-border rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <button type="submit" className="w-full bg-primary-button text-primary-button-text font-bold py-4 rounded-full hover:bg-primary-button-hover transition-colors">
                        Log In
                    </button>
                </form>
                <div className="text-center mt-6">
                    <p className="text-sm text-text-secondary">
                        Don't have an account?{' '}
                        <button onClick={onGoToCreateAccount} className="font-semibold text-accent hover:underline">
                            Create one
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
