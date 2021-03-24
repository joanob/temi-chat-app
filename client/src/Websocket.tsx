import React, {createContext} from 'react'
import {useDispatch} from "react-redux"
import { wsMessage } from './actions'

const WebSocketContext = createContext(null)

export default WebSocketContext 

// eslint-disable-next-line import/no-anonymous-default-export
export const WS = (props:any) => {
    let socket:WebSocket = null;
    
    const dispatch = useDispatch()

    const openWS = (token:string) => {
        if (socket === null) {
            socket = new WebSocket("ws://localhost:8080/ws/"+token) 
            socket.onopen = () => {
            }
            socket.onmessage = ev => {
                let msg = JSON.parse(ev.data)
                wsMessage(msg, dispatch)
            }
            socket.onclose = ev => {
                alert("Websocket closed!")
                dispatch({type: "NOTIFICATION", text: "Error de conexión"})
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
    const acceptContactRequest = (contact: any) => {
        let msg = {type: "ACCEPT_CONTACT_REQUEST", payload: contact}
        socket.send(JSON.stringify(msg))
        // Delete from requests and add to contacts
        dispatch({type: "DELETE_CONTACT_REQUEST", payload: contact})
        dispatch({type: "ADD_CONTACT", payload: contact})
    }

    let ws = {
        openWS,
        sendContactRequest,
        acceptContactRequest
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {props.children}
        </WebSocketContext.Provider>
    )
}
