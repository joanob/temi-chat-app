import { createSlice } from "@reduxjs/toolkit"

// Interfaces 
import { Contact } from "../interfaces"

const initialState: {list: Contact[]} = {
    list: []
}

export const contactsRequestedSlice = createSlice({
    name: "contactsRequested",
    initialState,
    reducers: {
        addContactsRequested: (state, {payload}) => {
            state.list.push(...payload)
        },
        addContactRequested: (state, {payload}) => {
            state.list.push(payload)
        },
        sendContactRequest: (state, {payload}) => {
            // Only sends data
        },
        deleteContactRequest: (state, {payload}) => {
            state.list = state.list.filter(contact => contact.id !== payload.id)
        },
        deleteContactRequested: (state, {payload}) => {
            state.list = state.list.filter(contact => contact.id !== payload.id)
        }
    }
})

export const {addContactsRequested, addContactRequested, sendContactRequest, deleteContactRequest, deleteContactRequested} = contactsRequestedSlice.actions

export default contactsRequestedSlice.reducer