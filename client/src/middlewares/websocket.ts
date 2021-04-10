import { RootState } from "../reducers"

import { Contact, Message } from "../interfaces"

// Actions
import { loggingIn, loggedIn } from "../reducers/user"
import { addContacts } from "../reducers/contacts"
import { addContactRequests } from "../reducers/contactRequests"
import { addContactsRequested } from "../reducers/contactsRequested"
import { addMessages } from "../reducers/messages"

interface Action {
    type: string;
    payload: any
}

interface ILoggedIn {
    type: string;
    payload: {
        user: Contact;
        contacts: Contact[];
        contactRequests: Contact[];
        contactsRequested: Contact[];
        messages: Message[]

    }
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
        let message: ILoggedIn = JSON.parse(e.data)
        if (message.type === "LOGGED_IN") {
            let {user, contacts, contactRequests, contactsRequested, messages} = message.payload
            store.dispatch(addContacts(contacts ? contacts : []))
            store.dispatch(addContactRequests(contactRequests ? contactRequests : []))
            store.dispatch(addContactsRequested(contactsRequested ? contactsRequested : []))
            store.dispatch(addMessages(messages ? messages : []))
            store.dispatch(loggedIn(user))
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
            default:
                next({type, payload})
                break;
        }
    }
}

export default socketMiddleware