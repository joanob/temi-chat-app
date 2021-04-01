import React, {useState} from 'react'
import { useParams, useHistory } from "react-router-dom"

// Styles
import styles from "./Chat.module.scss"
import {BiArrowBack, BiUpArrow} from "react-icons/bi"


const Chat = (props: any) => {
    const params = useParams()
    const history = useHistory()
    const [msg, setMsg] = useState("")

    return (
        <div className={styles.chat}>
            <header className={styles.header}>
                <BiArrowBack size={40} color="#fafafa" onClick={()=>{history.goBack()}} />
                <h2>Username</h2>
            </header>
            <main className={styles.messageList}>
                <article className={styles.incommingMessage}>
                    Hi there
                </article>
                <article className={styles.outcomingMessage}>
                    Hi there
                </article>
            </main>
            <footer className={styles.footer}>
                <input type="text" value={msg} onChange={e=>{setMsg(e.target.value)}} />
                <BiUpArrow size={30} color="#fafafa" />
            </footer>
        </div>
    )
}

export default Chat
