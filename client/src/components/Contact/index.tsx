import React, {useContext} from 'react'
import WSC from "../../Websocket"

// Interfaces
import {Contact as CO} from "../../interfaces"

// Styles
import styles from "./Contact.module.scss"
import { IoMdPerson } from "react-icons/io"
import { BiPlus, BiX } from "react-icons/bi"

const Contact = (props:any) => {
    const wsc = useContext(WSC)
    const contact:CO = props.contact

    const acceptContactRequest = () => {
        wsc.acceptContactRequest(contact)
    }

    return (
        <article className={props.isRequest !== undefined ? styles.contactRequest : styles.contact}>
            <div className={styles.avatar}>
                {contact.profilePic !== "" ? null : <IoMdPerson size={50} color="#fafafa" />}
            </div>
            <div className={styles.name}>
                <span>{contact.username}</span>
            </div>
            {props.isRequest === undefined ?
                <div className={styles.message}>
                    <span>{contact.profileBio || "Usando Temi"}</span>
                </div>
            :
                <div className={styles.requestButtons}>
                    <BiX size={30} color="#fee440" />
                    {props.isRequest === true ? <BiPlus size={30} color="#fee440" onClick={acceptContactRequest} /> : null}
                </div>   
            }
        </article>
    )
}

export default Contact
