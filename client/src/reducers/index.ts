import { combineReducers } from "redux";
import {Contact, Message, Notification} from "../interfaces"

// USER REDUCER
const user = (state:Contact = null, action:any) => {
    switch (action.type) {
        case "LOGGING_IN":
            return {id: 0, username: "", profilePic: "", profileBio: "", lastChat: 0}
        case "LOGGED_IN":
            let user = action.user
            return {id: user.id, username: user.username, profilePic: user.profilePic, profileBio: user.profileBio, lastChat: 1}
        default:
            return state
    }
}

// NOTIFICATIONS REDUCER
const notifications = (state:Notification[] = [], action: any) => {
    switch (action.type) {
        case "NOTIFICATION":
            let now = new Date();
            let notification:Notification = {text: action.text, time: now.getTime()}
            return [...state, notification]
        default:
            return state
            
    }
}

// CONTACTS REDUCER
const contacts = (state:Contact[] = [], action: any) => {
    let payload = action.payload;
    switch (action.type) {
        case "ADD_CONTACT":
            let contact:Contact = {id: payload.id, username: payload.username, profilePic: payload.profilePic, profileBio: payload.profileBio}
            return [...state, contact]
        default:
            return state
    }
}

// CONTACT REQUESTS REDUCER
const contactRequests = (state:Contact[] = [], action:any) => {
    let payload = action.payload;
    switch (action.type) {
        case "ADD_CONTACT_REQUEST":
            let contact:Contact = {id: payload.id, username: payload.username, profilePic: payload.profilePic, profileBio: payload.profileBio}
            return [...state, contact]
        case "DELETE_CONTACT_REQUEST":
            return state.filter(contact => contact.id !== payload.id)
        default:
            return state
    }
}


// CONTACTS REQUESTED REDUCER
const contactsRequested = (state:Contact[] = [], action:any) => {
    let payload = action.payload;
    switch (action.type) {
        case "ADD_CONTACT_REQUESTED":
                let contact:Contact = {id: payload.id, username: payload.username, profilePic: payload.profilePic, profileBio: payload.profileBio}
                return [...state, contact]
        case "DELETE_CONTACT_REQUESTED":
            return state.filter(contact => contact.id !== payload.id)
        default:
            return state
    }
}

// MESSAGES REDUCER 
const messages = (state: Message[] = [], action: any) => {
    let payload = action.payload, msg: Message
    switch (action.type) {
        case "SEND_MESSAGE":
            msg = {id: state.length * -1, text: payload.text, senderId: 0, receiverId: payload.contactId, dateSended: "", dateReceived: {Time: "", Valid: false}};
            return [msg, ...state] // More recent first
        case "MESSAGE_SENDED":
            state.forEach((message, i) => {
                if (message.receiverId === payload.receiverId && message.text === payload.text) {
                    state[i] = payload;
                    return state
                }
            })
            return state
        case "MESSAGE_RECEIVED":
            msg = {id: payload.id, text: payload.text, senderId: payload.senderId, receiverId: payload.receiverId, dateSended: payload.dateSended, dateReceived: {Time: "", Valid: false}};
            return [msg, ...state]
        default:
            return state
    }
}

export default combineReducers({
    user,
    notifications,
    contacts,
    contactRequests,
    contactsRequested,
    messages
})