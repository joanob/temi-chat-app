import React from 'react'
import {Link} from "react-router-dom"

// Styles
import "./Landing.scss";

export default function Landing() {
    // Mostrar solo header si estás más abajo de primera sección
    return (
        <>
            <header>
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
            <main>
                <section>
                    <article>
                        <h1>Temi</h1>
                        <h2>Comunícate de forma privada y segura</h2>
                    </article>
                    <article>
                        <Link to="/login">Iniciar sesión</Link>
                        <Link to="/signup">Regístrate</Link>
                    </article>
                </section>
            </main>
            <footer>

            </footer>
        </>
    )
}
