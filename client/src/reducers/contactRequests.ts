import { createSlice } from "@reduxjs/toolkit"

// Interfaces 
import { Contact } from "../interfaces"

interface InitialState {
    list: Contact[]
}

const initialState: InitialState = {
    list: []
}

export const contactRequestsSlice = createSlice({
    name: "contactRequests",
    initialState,
    reducers: {
        addContactRequests: (state, {payload}) => {
            state.list.push(...payload)
        },
        addContactRequest: (state, {payload}) => {
            state.list.push(payload)
        },
        rejectContactRequest: (state, {payload}) => {
            state.list = state.list.filter(contact => contact.id !== payload.id)
        },
        deleteContactRequest: (state, {payload}) => {
            state.list = state.list.filter(contact => contact.id !== payload.id)
        }
    }
})

export const {addContactRequests, addContactRequest, rejectContactRequest, deleteContactRequest} = contactRequestsSlice.actions

export default contactRequestsSlice.reducer