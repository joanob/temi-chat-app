import React, {useContext} from 'react'
import WSC from "../../Websocket"

// Interfaces
import {Contact as CO} from "../../interfaces"

// Styles
import styles from "./Contact.module.scss"
import { IoMdPerson } from "react-icons/io"
import { TiTickOutline } from "react-icons/ti"

const Contact = (props:any) => {
    const wsc = useContext(WSC)
    const contact:CO = props.contact

    const acceptContactRequest = () => {
        wsc.acceptContactRequest(contact)
    }

    return (
        <article className={props.isActive ? styles.activeContact : styles.contact}>
            <div className={styles.avatar}>
                {contact.profilePic !== "" ? null : <IoMdPerson size={50} color="#fafafa" />}
            </div>
            <div className={styles.name}>
                {contact.username}
            </div>
            {props.isRequest ?
                <div className={styles.isRequest}>
                    {props.isRequest ? <TiTickOutline size={25} onClick={acceptContactRequest} /> : null}
                </div>
            :
                <div className={styles.message}>
                    {contact.profileBio || "Vendo opel corsa"}
                </div>
            }
            
        </article>
    )
}

export default Contact
