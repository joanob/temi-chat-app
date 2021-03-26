export interface Contact {
    id: number;
    username: string;
    profilePic: string;
    profileBio: string;
    lastChat?: number
    // Use lastChat for user as a loading flag. 0 for is loading, 1 is for loaded
}

export interface Notification {
    text: string,
    time: number
}