import { createSlice } from "@reduxjs/toolkit"

// Interfaces
import { Contact } from "../interfaces"

const initialState: Contact[] = []

export const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        addContact: (state, {payload}) => {
            state.push({id: payload.id, username: payload.username, profilePic: payload.profilePic, profileBio: payload.profileBio})
        },
        addContacts: (state, {payload}) => {
            state.push(payload)
        }
    }
})

export const {addContact, addContacts} = contactsSlice.actions

export default contactsSlice.reducer