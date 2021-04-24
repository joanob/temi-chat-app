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
            let contact: Contact = {id: payload.id, username: payload.username, profilePic: payload.profilePic?.String, profileBio: payload.profileBio?.String}
            state.list.push(contact)
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