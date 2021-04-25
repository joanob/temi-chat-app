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
        sendMessage: (state, {payload}) => {
            // Only sends data
        },
    }
})

export const {addMessages, addMessage, sendMessage} = messageSlice.actions

export default messageSlice.reducer