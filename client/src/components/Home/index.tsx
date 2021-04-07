import React from 'react'
import { connect } from "react-redux"
import {Link, useHistory} from "react-router-dom"
import CO from "../Contact"
import { Message, Contact } from '../../interfaces'

// Styles
import styles from "./Home.module.scss"
import {RiContactsFill, RiSettings3Fill} from "react-icons/ri"

const Home = (props:any) => {
    const {user, contacts, messages} = props
    let lastMessages = {}, chatsSorted: any[] = []; // Key user id, value time in miliseconds
    const history = useHistory()
    
    if (!user) {
        return <div>Loading</div>
    }

    // Contacts to JSON
    let indexedContacts = {}
    contacts.forEach((contact: Contact) => {
        indexedContacts[contact.id] = contact
    });

    messages.forEach((message: Message) => {
        const contactId = message.senderId === user.id ? message.receiverId : message.senderId;
        const lastMessage = lastMessages[contactId];
        if (lastMessage) {
            let sended = new Date(message.dateSended)
            lastMessages[contactId] = sended.getTime() > lastMessage ? sended.getTime() : lastMessage
        } else {
            lastMessages[contactId] = new Date(message.dateSended).getTime()
        }  
    });

    // JSON to array
    for (const contactId in lastMessages) {
        chatsSorted.push({contactId, lastChat: lastMessages[contactId]})
    }

    const sortChats = (array: any[]): any[] => {
        if (array.length === 1) return array
        let left:any[] = [], right:any[] = []
        const pivot = array[0] 
        array.forEach(e => {
            if (e.lastChat < pivot.lastChat) {
                left.push(e)
            } else {
                right.push(e)
            }
        });
        return [sortChats(left), pivot, sortChats(right)]
    }

    chatsSorted = sortChats(chatsSorted)

    // TODO unread messages and chats with unread messages

    return (
    <>
        <header className={styles.header}>
            <div>3 chats</div>
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
            {chatsSorted.map(chat => {
                return <CO key={chat.contactId} contact={indexedContacts[chat.contactId]} onClick={()=>{history.push("/chat/"+chat.contactId)}} />
            })}
        </main>
    </>
    )
}

export default connect((state: any)=>{
    const {user, contacts, messages} = state 
    return {user, contacts, messages}
})(Home)