import React, {useState} from 'react'
import axios from "axios"

// Components 
import Contact from "../Contact"

// Styles
import styles from "./ContactList.module.scss"
import {BiArrowBack, BiPlus} from "react-icons/bi"
import {IoMdArrowDropdown, IoMdArrowDropup} from "react-icons/io"

const ContactList = () => {
    const [showForm, setShowForm] = useState(false)
    return (
        <>
            <header className={styles.header}>
                <BiArrowBack size={40} color="#fafafa" />
                <h2>Contactos</h2>
                <BiPlus size={40} className={showForm ? styles.closeIcon : null} color="#fafafa" onClick={()=>{setShowForm(!showForm)}} />
            </header>
            {
                showForm ?
                <AddContactForm />
                :
                <main>
                    <Collapsable title="Solicitudes" />
                    <Collapsable title="Pendientes" />
                    <section>
                        <Contact />
                        <Contact />
                        <Contact />
                    </section>
                </main>
            }
        </>
    )
}

export default ContactList

const Collapsable = (props:any) => {
    const [collapsed, setCollapsed] = useState(true)
    let list = [0,0,0,0]
    return (
        <section>
            <header className={styles.collapsableHeader} onClick={()=>{setCollapsed(!collapsed)}}>{props.title} {collapsed ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}</header>
            {collapsed ? null : 
            list.map(()=>{return <Contact />})}
        </section>
    )
}

const AddContactForm = () => {
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

    const onSubmit = (e:any) => {
        e.preventDefault()
        
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