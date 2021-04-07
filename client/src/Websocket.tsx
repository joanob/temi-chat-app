import React, {createContext} from 'react'

// Redux
import {useAppDispatch} from "./hooks"
import { wsMessage } from './actions'

// Interfaces
import {Contact} from "./interfaces"

interface WSProps {
    openWS: (token: string, onSuccess: () => void) => void,
    sendContactRequest: (username: string) => void,
    acceptContactRequest: (contact: Contact) => void,
    rejectContactRequest: (contact: Contact) => void,
    deleteContactRequested: (contact: Contact) => void,
    sendMessage: (contactId: number, text: string) => void
}

// Context

const WebSocketContext = createContext<WSProps>(null)

export default WebSocketContext 

// Component

export const WS: React.FC = ({children}) => {
    let socket: WebSocket = null;
    
    const dispatch = useAppDispatch()

    const openWS = (token: string, onSuccess: () => void) => {
        dispatch({type: "LOGGING_IN"})

        if (socket === null) {
            socket = new WebSocket("ws://localhost:8080/ws/" + token) 

            socket.onopen = () => {
                onSuccess()
            }

            socket.onmessage = ev => {
                let msg = JSON.parse(ev.data)
                wsMessage(msg, dispatch)
            }

            socket.onclose = () => {
                //dispatch({type: "NOTIFICATION", text: "Error de conexión"})
                window.location.href = "/login"
            }
        }
    }

    // Send request to given username
    const sendContactRequest = (username: string) => {
        let msg = {type: "NEW_CONTACT_REQUESTED", payload: username}
        socket.send(JSON.stringify(msg));
    }

    // Accept contact request
    const acceptContactRequest = (contact: Contact) => {
        let msg = {type: "ACCEPT_CONTACT_REQUEST", payload: contact}
        socket.send(JSON.stringify(msg))

        dispatch({type: "DELETE_CONTACT_REQUEST", payload: contact})
        dispatch({type: "ADD_CONTACT", payload: contact})
    }

    const rejectContactRequest = (contact: Contact) => {
        let msg = {type: "REJECT_CONTACT_REQUEST", payload: contact}
        socket.send(JSON.stringify(msg))

        dispatch({type: "DELETE_CONTACT_REQUEST", payload: contact})
    }

    const deleteContactRequested = (contact: Contact) => {
        let msg = {type: "DELETE_CONTACT_REQUESTED", payload: contact}
        socket.send(JSON.stringify(msg))
        dispatch(msg)
    }

    const sendMessage = (contactId: number, text: string) => {
        let msg = {type: "SEND_MESSAGE", payload: {contactId, text}}
        socket.send(JSON.stringify(msg))
        dispatch(msg)
    }

    let ws: WSProps = {
        openWS,
        sendContactRequest,
        acceptContactRequest,
        rejectContactRequest,
        deleteContactRequested,
        sendMessage
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    )
}
