import { createSlice } from "@reduxjs/toolkit"

// Interfaces 
import { Message } from "../interfaces"

type UserMessages = {
    [key: number]: Message[]
}

interface InitialState {
    list: UserMessages,
    userId: number
}

const initialState: InitialState = {
    list: {},
    userId: 0
}

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        loggingIn: (state, {payload}) => {
            state.userId = parseInt(payload)
        },
        addMessages: (state, {payload}) => {
            payload.forEach((message: Message) => {
                let id = message.senderId === state.userId ? message.receiverId : message.senderId
                if (state.list[id] === undefined) {
                    state.list[id] = []
                }
                let msg = message 
                msg.dateSended = dateParser(msg.dateSended)
                if (msg.dateReceived.Valid) {
                    msg.dateReceived.Time = dateParser(msg.dateReceived.Time)
                }
                state.list[id].unshift(message)
            });
        },
        addMessage: (state, {payload}) => {
            let message: Message = payload;
            let id = message.senderId === state.userId ? message.receiverId : message.senderId
            state.list[id].unshift(message)
        },
        sendMessage: (state, {payload}) => {
            // Only sends data
        },
        readMessage: (state, {payload}) => {
            let contactId = payload.contactId
            state.list[contactId].forEach(message => {
                if (message.id === payload.id) {
                    message.dateReceived.Valid = true
                }  
            })
        }
    }
})

export const {loggingIn, addMessages, addMessage, sendMessage, readMessage} = messageSlice.actions

export default messageSlice.reducer

export const dateParser = (inDate: string) : number => {
    return new Date(inDate).getTime()
}