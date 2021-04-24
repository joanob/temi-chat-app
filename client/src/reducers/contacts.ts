import { createSlice } from "@reduxjs/toolkit"

// Interfaces
import { Contact } from "../interfaces"

interface InitialState {
    list: Contact[]
}

const initialState: InitialState = {
    list: []
}

export const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        addContact: (state, {payload}) => {
            state.list.push({id: payload.id, username: payload.username, profilePic: payload.profilePic, profileBio: payload.profileBio})
        },
        addContacts: (state, {payload}) => {
            state.list.push(...payload)
        },
        acceptContactRequest: (state, {payload}) => {
            state.list.push(payload)
        }
    }
})

export const {addContact, addContacts, acceptContactRequest} = contactsSlice.actions

export default contactsSlice.reducer