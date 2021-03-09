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
                console.log("Connected!");
            }
            socket.onmessage = ev => {
                let msg = JSON.parse(ev.data)
                wsMessage(msg, dispatch)
            }
            socket.onclose = ev => {
                dispatch({type: "NOTIFICATION", text: "Error de conexión"})
            }
        }
    }

    // Send request to given username
    const sendContactRequest = (username: string) => {
        let msg = {type: "REQUEST_CONTACT", username}
        socket.send(JSON.stringify(msg));
    }

    // I think there's no need to provide the actual socket
    let ws = {
        openWS,
        sendContactRequest
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {props.children}
        </WebSocketContext.Provider>
    )
}
