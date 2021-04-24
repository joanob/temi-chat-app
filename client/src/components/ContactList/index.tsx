import React, {useState} from 'react'
import {useHistory} from "react-router-dom"
import axios from "axios"

// Redux 
import { useStore, useDispatch} from "../../hooks"
import { sendContactRequest } from "../../reducers/contactsRequested"

// Interfaces
import {Contact as IContact} from "../../interfaces"

// Components 
import Contact from "../Contact"

// Styles
import styles from "./ContactList.module.scss"
import {BiArrowBack, BiPlus} from "react-icons/bi"
import {IoMdArrowDropdown, IoMdArrowDropup} from "react-icons/io"

const ContactList = () => {
    const contacts = useStore(store => store.contacts.list)
    const contactRequests = useStore(store => store.contactRequests.list)
    const contactsRequested = useStore(store => store.contactsRequested.list)
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
                        {contacts.map((contact: IContact) => {
                            return <Contact key={contact.id} contact={contact} onClick={()=>{history.push("/chat/"+contact.id)}} />
                        })}
                    </section>
                </main>
            }
        </>
    )
}

export default ContactList

const Collapsable = ({title, contacts, areRequests}: {title: string, contacts: IContact[], areRequests: boolean}) => {
    const [collapsed, setCollapsed] = useState(true)

    return (
        <section>
            <header className={styles.collapsableHeader} onClick={()=>{setCollapsed(!collapsed)}}>{title} {collapsed ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}</header>
            {collapsed ? null : 
            contacts.map(contact => {
                return <Contact key={contact.id} contact={contact} isRequest={areRequests} />
            })}
        </section>
    )
}

const AddContactForm = ({close}: {close: () => void}) => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const [userExists, setUserExists] = useState(null)

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

    const onSubmit = (e: any) => {
        e.preventDefault()
        dispatch(sendContactRequest({username}))
        close()
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