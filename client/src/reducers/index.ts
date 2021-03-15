import { combineReducers } from "redux";
import {Contact, Notification} from "../interfaces"

const user = (state:Contact = null, action:any) => {
    switch (action.type) {
        case "LOGGED_IN":
            let user = action.user
            return {id: user.id, username: user.username, profilePic: user.profilePic, profileBio: user.profileBio}
        default:
            return state
    }
}

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

const contacts = (state:Contact[] = [], action: any) => {
    let payload = action.payload;
    switch (action.type) {
        case "NEW_CONTACT":
            let contact:Contact = {id: payload.id, username:payload.username,profilePic: payload.profilePic, profileBio:payload.profileBio}
            return [...state, contact]
        default:
            return state
    }
}

const contactRequests = (state:Contact[] = [], action:any) => {
    let payload = action.payload;
    switch (action.type) {
        case "NEW_CONTACT_REQUEST":
            let contact:Contact = {id: payload.id, username:payload.username,profilePic: payload.profilePic, profileBio:payload.profileBio}
            return [...state, contact]
        // TODO create list of users you sent a request
        default:
            return state
    }
}

const contactsRequested = (state:Contact[] = [], action:any) => {
    let payload = action.payload;
    switch (action.type) {
        case "NEW_CONTACT_REQUESTED":
                let contact:Contact = {id: payload.id, username:payload.username,profilePic: payload.profilePic, profileBio:payload.profileBio}
                return [...state, contact]
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