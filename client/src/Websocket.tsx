import React, {createContext} from 'react'
import {useDispatch} from "react-redux"
import { wsMessage } from './actions'

const WebSocketContext = createContext(null)

export { WebSocketContext }

export default (props:any) => {
    let socket:WebSocket = null;
    
    const dispatch = useDispatch()

    const openWS = (token:string) => {
        if (socket === null) {
            socket = new WebSocket("ws://localhost:3000/ws/"+token)
            socket.onopen = ev => {
                // 
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
