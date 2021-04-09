import { RootState } from "../reducers"

// Actions
import { loggingIn } from "../reducers/user"

interface Action {
    type: string;
    payload: any
}

const socketMiddleware: any = () => {
    let socket: WebSocket = null

    const onOpen = (store: RootState) => () => {
        // Socket opened
    }
    
    const onClose = (store: RootState) => () => {
        // Socket closed
    }

    const onMessage = (store: RootState) => (e: MessageEvent) => {
        
    }

    return (store: RootState) => (next: any) => ({type, payload}: Action) => {
        switch (type) {
            case "WS_CONNECT":
                socket = new WebSocket("ws://localhost:8080/ws/" + payload.token)
                socket.onmessage = onMessage(store)
                socket.onclose = onClose(store)
                socket.onopen = onOpen(store)
                next(loggingIn())
                break;
            default:
                next({type, payload})
                break;
        }
    }
}

export default socketMiddleware