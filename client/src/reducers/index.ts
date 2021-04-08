import { configureStore } from "@reduxjs/toolkit"

// Reducers
import user from "./user"
import contacts from "./contacts"
import contactRequests from "./contactRequests"
import contactsRequested from "./contactsRequested"
import messages from "./messages"


const store = configureStore({
    reducer: {
        user,
        contacts,
        contactRequests,
        contactsRequested,
        messages
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch