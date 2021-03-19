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
            <div>3 chats</div>
            <Link to="/home"><h2>Temi</h2></Link>
            <ul>
                <li><Link to="/contacts">Contactos</Link></li>
                <li><Link to="/settings">Ajustes</Link></li>
            </ul>
        </header>
        <main>
            <Contact />
            <Contact />
            <Contact />
        </main>
    </>
    )
}

export default Home