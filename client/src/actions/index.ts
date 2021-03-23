// Outgoing message types

import { Contact } from "../interfaces";

// Switch action for received message
export const wsMessage = (msg: any, dispatch:any) => {
    switch (msg.type) {
        case "LOGGED_IN":
            let {id, username, profilePic, profileBio, signupDate} = msg.payload;
            let user = {id, username, profilePic: profilePic.String, profileBio: profileBio.String, signupDate }
            dispatch({type: "LOGGED_IN", user})
            break
        case "CONTACT_REQUEST_APROVED":
            let contact: Contact = JSON.parse(msg.payload);
            dispatch({type: "NEW_CONTACT", payload: contact});
            //dispatch({type: "NOTIFICATION", text: contact.username + " ha aceptado tu solicitud"})
            break
        case "NEW_CONTACT_REQUEST":
            contact = JSON.parse(msg.payload);
            dispatch({type: "NEW_CONTACT_REQUEST", payload: contact})
            //dispatch({type: "NOTIFICATION", text: "Has recibido una solicitud de contacto"})
            break
        case "NEW_CONTACT_REQUESTED":
            contact = JSON.parse(msg.payload)
            dispatch({type: "NEW_CONTACT_REQUESTED", payload: contact})
            // NOTIFICATION
            break
    }
}