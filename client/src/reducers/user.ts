import {createSlice } from "@reduxjs/toolkit"

// Interfaces
import { Contact } from "../interfaces"

const initialState: Contact = null

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loggingIn: (state) => {
            state = {id: 0, username: "", profileBio: "", profilePic: ""}
        },
        loggedIn: (state, action) => {
            state = action.payload
        }
    }
})

export const {loggingIn, loggedIn} = userSlice.actions 

export default userSlice.reducer