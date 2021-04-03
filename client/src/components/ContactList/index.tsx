import React, {useState, useContext} from 'react'
import {connect} from "react-redux"
import {useHistory} from "react-router-dom"
import axios from "axios"
import WebSocketContext from "../../Websocket"

// Interfaces
import {Contact as CO} from "../../interfaces"

// Components 
import Contact from "../Contact"

// Styles
import styles from "./ContactList.module.scss"
import {BiArrowBack, BiPlus} from "react-icons/bi"
import {IoMdArrowDropdown, IoMdArrowDropup} from "react-icons/io"

const ContactList = (props:any) => {
    const {contacts, contactRequests, contactsRequested} = props 
    const history = useHistory()
    const [showForm, setShowForm] = useState(false)

    return (
        <>
            <header className={styles.header}>
                <BiArrowBack size={40} color="#fafafa" onClick={()=>{history.goBack()}} />
                <h2>Contactos</h2>
                <BiPlus size={40} className={showForm ? styles.closeIcon : null} color="#fafafa" onClick={()=>{setShowForm(!showForm)}} />
            </header>
            {
                showForm ?
                <AddContactForm close={()=>{setShowForm(false)}} />
                :
                <main>
                    <Collapsable title="Solicitudes" contacts={contactRequests} areRequests={true} />
                    <Collapsable title="Pendientes" contacts={contactsRequested} areRequests={false} />
                    <section>
                        {contacts.map((contact: CO) => {
                            return <Contact key={contact.id} contact={contact} onClick={()=>{history.push("/chat/"+contact.id)}} />
                        })}
                    </section>
                </main>
            }
        </>
    )
}

export default connect((state: any)=>{
    const {contacts, contactRequests, contactsRequested} = state
    return {contacts, contactRequests, contactsRequested}
})(ContactList)

const Collapsable = (props:any) => {
    const {contacts} = props
    const [collapsed, setCollapsed] = useState(true)
    return (
        <section>
            <header className={styles.collapsableHeader} onClick={()=>{setCollapsed(!collapsed)}}>{props.title} {collapsed ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}</header>
            {collapsed ? null : 
            contacts.map((contact: CO) => {
                return <Contact key={contact.id} contact={contact} isRequest={props.areRequests} />
            })}
        </section>
    )
}

const AddContactForm = (props:any) => {
    const [username, setUsername] = useState("")
    const [userExists, setUserExists] = useState(null)
    const ws = useContext(WebSocketContext)

    let usernameTimeout:NodeJS.Timeout;

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
        if (usernameTimeout) {
            clearTimeout(usernameTimeout)
        }
        usernameTimeout = setTimeout(()=>{
            axios.get("http://localhost:8080/username/"+e.target.value)
            .then(()=>{setUserExists(true)})
            .catch(()=>{setUserExists(false)})
        }, 500)
    }

    const onSubmit = (e:any) => {
        e.preventDefault()
        ws.sendContactRequest(username)
        props.close()
    }

    return (
        <main>
            <form className={styles.contactForm} onSubmit={onSubmit}>
                <input type="text" onChange={onUsernameChange} value={username} placeholder="Nombre de usuario" />
                <input type="submit" value="Enviar" disabled={!userExists} />
            </form>
        </main>
    )
}