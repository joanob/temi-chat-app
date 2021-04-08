import { createSlice } from "@reduxjs/toolkit"

// Interfaces 
import { Contact } from "../interfaces"

const initialState: Contact[] = []

export const contactsRequestedSlice = createSlice({
    name: "contactsRequested",
    initialState,
    reducers: {
        addContactsRequested: (state, {payload}) => {
            state.push(payload)
        },
        addContactRequested: (state, {payload}) => {
            state.push(payload)
        },
        deleteContactRequested: (state, {payload}) => {
            state = state.filter(contact => contact.id !== payload.id)
        }
    }
})

export const {addContactsRequested, addContactRequested, deleteContactRequested} = contactsRequestedSlice.actions

export default contactsRequestedSlice.reducer