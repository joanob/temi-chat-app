import React from 'react'
import {Link} from "react-router-dom"

// Styles
import styles from "./Landing.module.scss";

export default function Landing() {
    // Mostrar solo header si estás más abajo de primera sección
    return (
        <>
            <header className={styles.header}>
                <h2>Temi</h2>
                <nav>
                    <ul>
                        <li>
                            Entra
                        </li>
                        <li>
                            Únete
                        </li>
                    </ul>
                </nav>
            </header>
            <main className={styles.main}>
                <section>
                        <h1>Temi</h1>
                        <h2>Comunícate de forma privada y segura</h2>
                        <Link to="/login">Iniciar sesión</Link>
                        <Link to="/signup">Regístrate</Link>
                </section>
            </main>
            <footer>

            </footer>
        </>
    )
}
