export interface User {
    id: number;
    username: string
}

export interface Contact {
    id: number;
    username: string;
    profilePic: string;
    profileBio: string
}

export interface Message {
    id: number,
    text: string,
    senderId: number,
    receiverId: number,
    dateSended: any,
    dateReceived: {
        Time: any,
        Valid: boolean
    }
}

export interface Notification {
    text: string,
    time: number
}