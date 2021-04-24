import React from 'react'
import {Link} from "react-router-dom"

// Redux
import { useStore, useDispatch } from "../../hooks"

// Interfaces
import { Message, Contact as IContact } from '../../interfaces'

// Components
import Contact from "../Contact"

// Styles
import styles from "./Home.module.scss"
import {RiContactsFill, RiSettings3Fill} from "react-icons/ri"

const Home = () => {
    const user = useStore(store => store.user.user)
    const contacts = useStore(store => store.contacts.list)
    const messages = useStore(store => store.messages.list)



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
            {/* {chatsSorted.map(chat => {
                return <CO key={chat.contactId} contact={indexedContacts[chat.contactId]} onClick={()=>{history.push("/chat/"+chat.contactId)}} />
            })} */}
        </main>
    </>
    )
}

export default Home