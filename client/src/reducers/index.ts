import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import wsMiddleware from "../middlewares/websocket"

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
    },
    middleware: [wsMiddleware(), ...getDefaultMiddleware()]
    /* ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsMiddleware) */
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch