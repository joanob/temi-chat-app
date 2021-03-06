// Outgoing message types

import { Contact } from "../interfaces";

// Switch action for received message
export const wsMessage = (msg: any, dispatch:any) => {
    const payload: any = msg.payload
    let contact: Contact
    switch (msg.type) {
        case "LOGGED_IN":
            loggedIn(payload, dispatch)
            break
        case "CONTACT_REQUEST_APROVED":
            contact = {id: payload.id, username: payload.username, profilePic: payload.profileBio.String, profileBio: payload.profileBio.String};
            dispatch({type: "ADD_CONTACT", payload: contact});
            dispatch({type: "DELETE_CONTACT_REQUESTED", payload: contact})
            //dispatch({type: "NOTIFICATION", text: contact.username + " ha aceptado tu solicitud"})
            break
        case "CONTACT_REQUEST_REJECTED":
            contact = {id: payload.id, username: payload.username, profilePic: payload.profileBio.String, profileBio: payload.profileBio.String};
            dispatch({type: "DELETE_CONTACT_REQUESTED", payload: contact})
            break
        case "NEW_CONTACT_REQUEST":
            contact = {id: payload.id, username: payload.username, profilePic: payload.profileBio.String, profileBio: payload.profileBio.String};
            dispatch({type: "ADD_CONTACT_REQUEST", payload: contact})
            //dispatch({type: "NOTIFICATION", text: "Has recibido una solicitud de contacto"})
            break
        case "DELETED_CONTACT_REQUEST":
            contact = {id: payload.id, username: payload.username, profilePic: payload.profileBio.String, profileBio: payload.profileBio.String};
            dispatch({type: "DELETE_CONTACT_REQUEST", payload: contact})
            break
        case "NEW_CONTACT_REQUESTED":
            contact = {id: payload.id, username: payload.username, profilePic: payload.profileBio.String, profileBio: payload.profileBio.String};
            dispatch({type: "ADD_CONTACT_REQUESTED", payload: contact})
            // NOTIFICATION
            break
        case "MESSAGE_SENDED":
            dispatch({type: "MESSAGE_SENDED", payload})
            break;
        case "MESSAGE_RECEIVED":
            dispatch({type: "MESSAGE_RECEIVED", payload})
            break;
    }
}

const loggedIn = (payload:any, dispath: any) => {
    const {user, contacts, contactsRequested, contactRequests, messages} = payload
    if (contacts) {
        contacts.forEach((contact:any) => {
            dispath({type: "ADD_CONTACT", payload: {id: contact.id, username: contact.username, profilePic: contact.profileBio.String, profileBio: contact.profileBio.String}})
        });
    }
    if (contactsRequested) {
        contactsRequested.forEach((contact:any) => {
            dispath({type: "ADD_CONTACT_REQUESTED", payload: {id: contact.id, username: contact.username, profilePic: contact.profileBio.String, profileBio: contact.profileBio.String}})
        });
    }
    if (contactRequests) {
        contactRequests.forEach((contact:any) => {
            dispath({type: "ADD_CONTACT_REQUEST", payload: {id: contact.id, username: contact.username, profilePic: contact.profileBio.String, profileBio: contact.profileBio.String}})
        });
    }
    if (messages) {
        messages.forEach((message:any) => {
            dispath({type: "ADD_MESSAGE", payload: message})
        });
    }
    dispath({type: "LOGGED_IN", user})
}