import { combineReducers } from "redux";
import {Contact, Notification} from "../interfaces"

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

export default combineReducers({
    user,
    notifications,
    contacts,
    contactRequests,
    contactsRequested
})