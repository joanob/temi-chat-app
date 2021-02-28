// Outgoing message types

import { Contact } from "../interfaces";

// Switch action for received message
export const wsMessage = (msg: any, dispatch:any) => {
    switch (msg.type) {
        case "LOGGED_IN":
            let payload = msg.payload;
            dispatch({type: "LOGGED_IN", id: payload.id})
            break
        case "CONTACT_REQUEST_APROVED":
            let contact: Contact = JSON.parse(msg.payload);
            dispatch({type: "NEW_CONTACT", payload: contact});
            dispatch({type: "NOTIFICATION", text: contact.username + " ha aceptado tu solicitud"})
            break
        case "NEW_CONTACT_REQUEST":
            contact = JSON.parse(msg.payload);
            dispatch({type: "NEW_CONTACT_REQUEST", payload: contact})
            dispatch({type: "NOTIFICATION", text: "Has recibido una solicitud de contacto"})
            break
        case "NEW_CONTACT_REQUESTED":
            contact = JSON.parse(msg.payload)
            dispatch({type: "NEW_CONTACT_REQUESTED", payload: contact})
            break
    }
}