import { createSlice } from "@reduxjs/toolkit"

// Interfaces 
import { Message } from "../interfaces"

const initialState: Message[] = []

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessages: (state, {payload}) => {
            return [...payload, ...state]
        },
        addMessage: (state, {payload}) => {
            state.push(payload)
        },
        messageSended: (state, {payload}) => {
            state.forEach((message, i) => {
                if (message.id === payload.tempId) {
                    state[i] = {id: payload.id, text: payload.text, senderId: payload.senderId, receiverId: payload.receiverId, dateSended: payload.dateSended, dateReceived: payload.dateReceived}
                }
            })
        }
    }
})

export const {addMessages, addMessage, messageSended} = messageSlice.actions

export default messageSlice.reducer