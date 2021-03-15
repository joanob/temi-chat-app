import React from 'react'

// Styles
import styles from "./Contact.module.scss"
import { IoMdPerson } from "react-icons/io"

const Contact = (props:any) => {
    return (
        <article className={props.isActive ? styles.activeContact : styles.contact}>
            <div className={styles.avatar}>
                <IoMdPerson size={50} color="#fafafa" />
            </div>
            <div className={styles.name}>
                John Doe
            </div>
            <div className={styles.message}>
                Vendo Opel Corsa
            </div>
        </article>
    )
}

export default Contact
