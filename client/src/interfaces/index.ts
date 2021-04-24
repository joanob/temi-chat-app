export interface Contact {
    id: number;
    username: string;
    profilePic: {String: string, Valid: boolean};
    profileBio: {String: string, Valid: boolean}
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