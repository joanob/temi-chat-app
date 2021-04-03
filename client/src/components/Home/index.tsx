import React from 'react'
import {Link, Redirect} from "react-router-dom"

// Styles
import styles from "./Home.module.scss"
import {RiContactsFill, RiSettings3Fill} from "react-icons/ri"

const Home = (props:any) => {
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
            
        </main>
    </>
    )
}

export default Home