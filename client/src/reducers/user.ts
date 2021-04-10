import {createSlice } from "@reduxjs/toolkit"

// Interfaces
import { Contact } from "../interfaces"

const initialState: Contact = null

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loggingIn: (state, {payload}) => {
            return {id: 0, username: "", profileBio: "", profilePic: ""}
        },
        loggedIn: (state, {payload}) => {
            return {id: payload.id, username: payload.username, profilePic: payload.profilePic, profileBio: payload.profileBio}
        }
    }
})

export const {loggingIn, loggedIn} = userSlice.actions 

export default userSlice.reducer