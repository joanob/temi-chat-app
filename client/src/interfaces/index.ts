export interface Contact {
    id: number;
    username: string;
    profilePic: string;
    profileBio: string;
    lastChat?: number
}

export interface Notification {
    text: string,
    time: number
}