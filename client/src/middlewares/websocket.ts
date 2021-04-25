import { RootState } from "../reducers"

import { Contact, Message } from "../interfaces"

// Actions
import { loggingIn, loggedIn } from "../reducers/user"
import { addContact, addContacts } from "../reducers/contacts"
import { addContactRequest, addContactRequests, deleteContactRequest } from "../reducers/contactRequests"
import { addContactRequested, addContactsRequested, deleteContactRequested } from "../reducers/contactsRequested"
import { addMessages, addMessage } from "../reducers/messages"

interface Action {
    type: string;
    payload: any
}

interface ILoggedIn {
        user: Contact;
        contacts: Contact[];
        contactRequests: Contact[];
        contactsRequested: Contact[];
        messages: Message[]
}

const socketMiddleware: any = () => {
    let socket: WebSocket = null

    const onOpen = (store: RootState) => () => {
        // Socket opened
    }
    
    const onClose = (store: RootState) => () => {
        // Socket closed
    }

    const onMessage = (store: any) => (e: MessageEvent) => {
        let {type, payload}: Action = JSON.parse(e.data)
        switch (type) {
            case "LOGGED_IN":
                let loggedInMsg: ILoggedIn = payload
                store.dispatch(addContacts(loggedInMsg.contacts ? loggedInMsg.contacts : []))
                store.dispatch(addContactRequests(loggedInMsg.contactRequests ? loggedInMsg.contactRequests : []))
                store.dispatch(addContactsRequested(loggedInMsg.contactsRequested ? loggedInMsg.contactsRequested : []))
                store.dispatch(addMessages(loggedInMsg.messages ? loggedInMsg.messages : []))
                store.dispatch(loggedIn(loggedInMsg.user))
                break;
            case "NEW_CONTACT_REQUESTED":
                store.dispatch(addContactRequested(payload))
                break;
            case "NEW_CONTACT_REQUEST":
                store.dispatch(addContactRequest(payload))
                break;
            case "CONTACT_REQUEST_APROVED":
                store.dispatch(addContact(payload))
                store.dispatch(deleteContactRequested(payload))
                break
            case "CONTACT_REQUEST_REJECTED":
                store.dispatch(deleteContactRequested(payload))
                break
            case "DELETED_CONTACT_REQUEST":
                store.dispatch(deleteContactRequest(payload))
                break
            case "MESSAGE_SENDED":
                store.dispatch(addMessage(payload))
                break
            case "MESSAGE_RECEIVED":
                store.dispatch(addMessage(payload))
                break
            default:
                break;
        }
    }

    return (store: RootState) => (next: any) => ({type, payload}: Action) => {
        switch (type) {
            case "user/loggingIn":
                socket = new WebSocket("ws://localhost:8080/ws/" + payload.token)
                socket.onmessage = onMessage(store)
                socket.onclose = onClose(store)
                socket.onopen = onOpen(store)
                next(loggingIn({}))
                break;
            case "contactsRequested/sendContactRequest":
                socket.send(JSON.stringify({type: "NEW_CONTACT_REQUESTED", payload: {contactName: payload.username}}))
                next({type, payload})
                break;
            case "contacts/acceptContactRequest":
                socket.send(JSON.stringify({type: "ACCEPT_CONTACT_REQUEST", payload: payload.contact}))
                next(deleteContactRequest({payload: payload.contact}))
                next(addContact({payload: payload.contact}))
                break;
            case "contactRequests/rejectContactRequest":
                socket.send(JSON.stringify({type: "REJECT_CONTACT_REQUEST", payload: payload.contact}))
                next({type, payload: payload.contact})
                break
            case "contactsRequested/deleteContactRequest":
                socket.send(JSON.stringify({type: "DELETE_CONTACT_REQUESTED", payload: payload.contact}))
                next({type, payload: payload.contact})
                break
            case "message/sendMessage":
                socket.send(JSON.stringify({type: "SEND_MESSAGE", payload: payload.message}))
                next({type, payload: payload.message})
                break
            default:
                next({type, payload})
                break;
        }
    }
}

export default socketMiddleware