
import React, { useRef } from 'react';
import type { Challenge, User } from '../../types';

interface ChallengeScreenProps {
    challengeId: string;
    onBack: () => void;
    allUsers: User[];
    challenges: Challenge[];
    onVote: (challengeId: string, submissionId: string) => void;
    onSubmitPhoto: (challengeId: string, imageUrl: string) => void;
    currentUser: User;
    showToast: (message: string) => void;
}

const ChallengeScreen: React.FC<ChallengeScreenProps> = ({ challengeId, onBack, allUsers, challenges, onVote, onSubmitPhoto, currentUser, showToast }) => {
    const challenge = challenges.find(c => c.id === challengeId);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!challenge) {
        return (
            <div className="w-full h-full bg-background-primary text-text-primary p-8 flex flex-col items-center justify-center">
                <p>Challenge not found.</p>
                <button onClick={onBack} className="mt-4 bg-primary-button text-primary-button-text font-bold py-2 px-4 rounded-full">Back</button>
            </div>
        );
    }

    const handlePhotoUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/heic'];
        if (!allowedTypes.includes(file.type)) {
            showToast('Invalid file type. Please select a JPG, PNG, or HEIC file.');
            return;
        }

        const maxSizeInMB = 5;
        if (file.size > maxSizeInMB * 1024 * 1024) {
            showToast(`File is too large. Maximum size is ${maxSizeInMB}MB.`);
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        onSubmitPhoto(challenge.id, imageUrl);
        e.target.value = "";
    };

    return (
        <div className="relative w-full h-full bg-background-primary text-text-primary">
            <header className="relative z-10 flex items-center p-4 pt-12 border-b border-border">
                <button onClick={onBack} className="text-text-primary font-bold text-2xl">&larr;</button>
                <div className="flex-grow text-center">
                    <h1 className="text-xl font-bold">{challenge.title}</h1>
                    <p className="text-sm text-text-secondary">{challenge.hobby}</p>
                </div>
                <div className="w-8"></div>
            </header>
            <main className="overflow-y-auto p-4 pb-24 h-full">
                <p className="text-center text-text-secondary mb-4">{challenge.description}</p>
                <button onClick={handlePhotoUploadClick} className="w-full bg-accent text-accent-text font-bold py-3 rounded-full mb-6 hover:bg-opacity-80 transition-colors">
                    Add Your Photo
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/jpeg,image/png,.heic"
                />

                <div className="grid grid-cols-2 gap-4">
                    {challenge.submissions.map(submission => {
                        const user = allUsers.find(u => u.id === submission.userId);
                        const hasVoted = currentUser.votedOn?.includes(submission.id);
                        return (
                            <div key={submission.id} className="bg-card rounded-lg overflow-hidden">
                                <img src={submission.image} alt={`Submission by ${user?.name}`} className="w-full h-40 object-cover" />
                                <div className="p-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <img src={user?.avatar} alt={user?.name} className="w-6 h-6 rounded-full" />
                                            <span className="text-xs font-semibold">@{user?.username}</span>
                                        </div>
                                        <button
                                            onClick={() => onVote(challenge.id, submission.id)}
                                            disabled={hasVoted}
                                            className={`flex items-center gap-1 text-xs font-bold p-1 rounded-md ${hasVoted ? 'text-accent' : 'text-text-secondary hover:text-accent disabled:opacity-50'}`}
                                        >
                                            <span className="text-lg">{hasVoted ? '♥' : '♡'}</span>
                                            {submission.votes}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default ChallengeScreen;
