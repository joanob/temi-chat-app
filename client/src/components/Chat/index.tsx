import React, {useState, useContext} from 'react'
import { useParams, useHistory, Redirect } from "react-router-dom"
import {connect} from "react-redux"
import {Contact, Message} from "../../interfaces"

// Styles
import styles from "./Chat.module.scss"
import {BiArrowBack, BiUpArrow} from "react-icons/bi"


const Chat = (props: any) => {
    const params:any = useParams()
    const history = useHistory()

    const contact:Contact = props.contacts.filter((contact:Contact) => contact.id === parseInt(params.id))[0]
    const messages:Message[] = props.messages.filter((message:Message) => message.receiverId === contact.id || message.senderId === contact.id)

    const [msg, setMsg] = useState("")

    const sendMessage = () => {
        if (msg.length !== 0) {
            //wsc.sendMessage(contact.id, msg)
            setMsg("")
        }
    }

    if (contact === undefined) {
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
                <BiUpArrow size={30} color="#fafafa" onClick={sendMessage} />
            </footer>
        </div>
    )
}

export default connect((state: any) => {
    const {contacts, messages} = state 
    return {contacts, messages}
})(Chat)
