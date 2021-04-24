import { createSlice } from "@reduxjs/toolkit"

// Interfaces 
import { Message } from "../interfaces"

const initialState: {list: Message[]} = {
    list: []
}

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessages: (state, {payload}) => {
            state.list.unshift(...payload)
        },
        addMessage: (state, {payload}) => {
            state.list.unshift(payload)
        },
        messageSended: (state, {payload}) => {
            state.list.forEach((message, i) => {
                if (message.id === payload.tempId) {
                    state.list[i] = {id: payload.id, text: payload.text, senderId: payload.senderId, receiverId: payload.receiverId, dateSended: payload.dateSended, dateReceived: payload.dateReceived}
                }
            })
        }
    }
})

export const {addMessages, addMessage, messageSended} = messageSlice.actions

export default messageSlice.reducer