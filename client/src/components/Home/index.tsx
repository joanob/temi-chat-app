import React from 'react'
import {Link} from "react-router-dom"

// Components
import Contact from "../Contact"

// Styles
import styles from "./Home.module.scss"

const Home = (props:any) => {
    return (
    <>
        <header className={styles.header}>
            <div>3 chats, 251 mensages</div>
            <Link to="/home"><h2>Temi</h2></Link>
            <ul>
                <li><Link to="/contacts">Contactos</Link></li>
                <li><Link to="/settings">Ajustes</Link></li>
            </ul>
        </header>
        <aside className={styles.aside}>
            <Contact />
            <Contact isActive />
            <Contact />
        </aside>
        <main></main>
    </>
    )
}

export default Home