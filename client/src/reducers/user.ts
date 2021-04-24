import {createSlice } from "@reduxjs/toolkit"

// Interfaces
import { Contact } from "../interfaces"

const initialState: {user: Contact} = {user: null}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loggingIn: (state, {payload}) => {
            state.user = {id: 0, username: "", profileBio: {String: "", Valid: false}, profilePic: {String: "", Valid: false}}
        },
        loggedIn: (state, {payload}) => {
            state.user = {id: payload.id, username: payload.username, profilePic: payload.profilePic, profileBio: payload.profileBio}
        }
    }
})

export const {loggingIn, loggedIn} = userSlice.actions 

export default userSlice.reducer