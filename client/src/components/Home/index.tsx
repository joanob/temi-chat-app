import React from 'react'
import {useHistory, Link} from "react-router-dom"

// Redux
import { useStore } from "../../hooks"

// Components
import Contact from "../Contact"

// Interfaces
import { Message, Contact as IContact } from '../../interfaces'

// Styles
import styles from "./Home.module.scss"
import {RiContactsFill, RiSettings3Fill} from "react-icons/ri"

const Home = () => {
    const history = useHistory()
    const user = useStore(store => store.user.user)
    const contacts = useStore(store => store.contacts.list)
    const messages = useStore(store => store.messages.list)

    let [unreadMessagesFromContact, chatsSorted] = sortConversations(messages, user)
    
    return (
    <>
        <header className={styles.header}>
            <div>{Object.keys(unreadMessagesFromContact).length} messages</div>
            <h2>Temi</h2>
            <ul>
                <li>
                    <Link to="/contacts">
                        <RiContactsFill size={22} />
                    </Link>
                </li>
                <li>
                    <Link to="/settings">
                        <RiSettings3Fill size={22} />
                    </Link>
                </li>
            </ul>
        </header>
        <main>
            {chatsSorted.map((chat:Chat) => {
                return <Contact key={chat.contactId} contact={contacts.filter(contact => contact.id === chat.contactId)[0]} onClick={()=>{history.push("/chat/"+chat.contactId)}} />
            })}
        </main>
    </>
    )
}

type Chat = {contactId: number, lastChat: number}

const sortConversations = (messages: {[key: number]: Message[]}, user: IContact) : [{[key: number]: number}, Chat[]] => {
    let unreadMesages: {[key: number]: number} = {}
    let chats: Chat[] = []
    // Get unread messages and lastchat time
    for (const key in messages) {
        const contactId = parseInt(key)
        unreadMesages[contactId] = 0
        let contactMessages = messages[contactId]
        chats.push({contactId: contactId, lastChat: contactMessages[contactMessages.length - 1].dateSended})
        for (let i = contactMessages.length -1; i > 0; i--) {
            if (contactMessages[i].senderId !== user.id) {
                if (contactMessages[i].dateReceived.Valid) {
                    break
                }
                unreadMesages[contactId]++
            }
        }
    }
    // Sort chats 
    for (let i = 0; i < chats.length; i++) {
        for (let j = 0; j < chats.length - 1; j++) {
            if (chats[j + 1].lastChat < chats[j].lastChat) {
                [chats[j+1], chats[j]] = [chats[j], chats[j+1]]
            }
        }
    }

    return [unreadMesages, chats]
}

export default Home