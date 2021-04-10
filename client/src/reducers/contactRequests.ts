import { createSlice } from "@reduxjs/toolkit"

// Interfaces 
import { Contact } from "../interfaces"

const initialState: Contact[] = []

export const contactRequestsSlice = createSlice({
    name: "contactRequests",
    initialState,
    reducers: {
        addContactRequests: (state, {payload}) => {
            return [...payload, ...state]
        },
        addContactRequest: (state, {payload}) => {
            state.push(payload)
        },
        deleteContactRequest: (state, {payload}) => {
            state = state.filter(contact => contact.id !== payload.id)
        }
    }
})

export const {addContactRequests, addContactRequest, deleteContactRequest} = contactRequestsSlice.actions

export default contactRequestsSlice.reducer