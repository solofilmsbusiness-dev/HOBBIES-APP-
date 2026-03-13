
export interface Settings {
    theme: 'light' | 'dark' | 'system' | 'slick';
    reducedMotion: boolean;
    fontSize: number;
    mediaAutoplay: boolean;
    soundHaptics: boolean;
    badgeStyle: 'dot' | 'count';
    privacyDefault: 'public' | 'friends' | 'private';
}

export interface Hobby {
    name: string;
    descriptor: string;
}

export interface Comment {
    id: number;
    user: string;
    text: string;
    userId?: string;
}

export interface Post {
    id: string;
    userId: string;
    user: string;
    text: string;
    image?: string;
    likes: number;
    liked: boolean;
    comments: Comment[];
    bookmarked?: boolean;
}

export interface DeckItem {
    id: number | string;
    title: string;
    points: number;
    image: string;
    color: string;
    description: string;
    location: string;
    time: string;
    status: 'completed' | 'pending' | 'redeemed';
    isMystery?: boolean;
}

export interface User {
    id: string;
    name: string;
    username: string;
    avatar: string;
    banner: string;
    bio: string;
    primaryHobby: Hobby;
    hobbies: string[];
    friendCount: number;
    followerCount: number | string;
    completedHobbies: number;
    deck?: DeckItem[];
    posts?: Post[];
    friends?: string[];
    pendingFriends?: string[];
    outgoingRequests?: string[];
    votedOn?: string[];
}

export interface Message {
    id: string;
    userId: string;
    name: string;
    avatar: string;
    lastMessage: string;
    unread: boolean;
}

export interface StoryItem {
    id: string;
    url: string;
    type: 'image' | 'video';
    duration: number;
    hobbyTag: string;
}

export interface Story {
    userId: string;
    stories: StoryItem[];
    hasUnseen: boolean;
}

export interface ChallengeSubmission {
    id: string;
    userId: string;
    image: string;
    votes: number;
    comments: Comment[];
}

export interface Challenge {
    id: string;
    hobby: string;
    title: string;
    description: string;
    endsIn: string;
    reward: {
        points: number;
        badge: string;
    };
    submissions: ChallengeSubmission[];
}

export interface DiscoverHobby {
    id: number;
    t: string; // title
    img: string;
    location: string;
    time: string;
    pts: number; // points
    priceLabel: string;
    description: string;
    category: string;
    isMystery?: boolean;
    thumb?: string; 
    cta?: string;
    host?: string;
    level?: string;
    price?: string;
    distance?: string;
    title?: string;
    points?: number;
    image?: string;
}

export type FriendshipStatus = 'self' | 'friends' | 'pending_outgoing' | 'pending_incoming' | 'not_friends';

export interface NavigationStackItem {
    view: string;
    props?: any;
}
