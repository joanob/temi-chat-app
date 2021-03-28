import React, {createContext} from 'react'
import {useDispatch} from "react-redux"
import { wsMessage } from './actions'
import {Contact} from "./interfaces"

const WebSocketContext = createContext(null)

export default WebSocketContext 

// eslint-disable-next-line import/no-anonymous-default-export
export const WS = (props:any) => {
    let socket:WebSocket = null;
    
    const dispatch = useDispatch()

    const openWS = (token:string, onSuccess: any) => {
        dispatch({type: "LOGGING_IN"})
        if (socket === null) {
            socket = new WebSocket("ws://localhost:8080/ws/"+token) 
            socket.onopen = () => {
                onSuccess()
            }
            socket.onmessage = ev => {
                let msg = JSON.parse(ev.data)
                wsMessage(msg, dispatch)
            }
            socket.onclose = ev => {
                alert("Websocket closed!")
                // Delete all user data using brute force: reloading to login
                window.location.href = "/login"
                //dispatch({type: "NOTIFICATION", text: "Error de conexión"})
            }
        }
    }

    // Send request to given username
    const sendContactRequest = (username: string) => {
        let msg = {type: "NEW_CONTACT_REQUESTED", payload: username}
        // Server adds contact request ands sends NEW CONTACT REQUESTED. Then dispatch
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

    let ws = {
        openWS,
        sendContactRequest,
        acceptContactRequest,
        rejectContactRequest,
        deleteContactRequested
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {props.children}
        </WebSocketContext.Provider>
    )
}
