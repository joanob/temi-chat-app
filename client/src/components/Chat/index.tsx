import React, {useState, useEffect} from 'react'
import { useParams, useHistory, Redirect } from "react-router-dom"

// Redux
import {useStore, useDispatch} from "../../hooks"
import {sendMessage, readMessage} from "../../reducers/messages"

// Interfaces
import {Contact, Message} from "../../interfaces"

// Styles
import styles from "./Chat.module.scss"
import {BiArrowBack, BiUpArrow} from "react-icons/bi"


const Chat = () => {
    const params: any = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const contact: Contact = useStore(store => store.contacts.list.filter(contact => contact.id === parseInt(params.id))[0])
    
    const messages: Message[] = useStore(store => store.messages.list[contact.id])

    const [msg, setMsg] = useState("")
    
    const send = () => {
        if (msg.length !== 0) {
            dispatch(sendMessage({message: {text: msg, contactId: contact.id}}))
        }
        setMsg("")
    }

    useEffect(() => {
        // Read all unread messages 
        messages.forEach(message => {
            if (message.senderId === contact.id) {
                if (!message.dateReceived.Valid) {
                    dispatch(readMessage({id: message.id, contactId: contact.id}))
                } else {
                    return
                }
            }
        })
    }, [messages])

    if (!contact) {
        return <Redirect to="/home" />    
    }

    return (
        <div className={styles.chat}>
            <header className={styles.header}>
                <BiArrowBack size={40} color="#fafafa" onClick={()=>{history.goBack()}} />
                <h2>{contact.username}</h2>
            </header>
            <main className={styles.messageList}>
                {messages.map(message => {
                    return (<article key={message.id} className={message.senderId === contact.id ? styles.incommingMessage : styles.outcomingMessage}>
                        {message.text}
                    </article>)
                })}
            </main>
            <footer className={styles.footer}>
                <input type="text" value={msg} autoFocus onChange={e=>{setMsg(e.target.value)}} />
                <BiUpArrow size={30} color="#fafafa" onClick={send} />
            </footer>
        </div>
    )
}

export default Chat
