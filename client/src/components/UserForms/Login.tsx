import React, {useState, useContext} from 'react'
import {useHistory} from "react-router-dom"
import axios from "axios"
import WS from "../../Websocket"

// Styles
import styles from "./UserForms.module.scss"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState("")
    const ws = useContext(WS)
    const history = useHistory()

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        axios.post("http://localhost:8080/login", JSON.stringify({username, pass: password}))
        .then(res => {
            ws.openWS(res.data, () => {
                history.push("/home")
            })
        })
    }

    return (
        <main className={styles.main}>
           <h1>Iniciar sesión</h1> 
           <form onSubmit={onSubmit}>
               {formError === "" ? null : <label className="form-error">{formError}</label>}
               <label htmlFor="username">Nombre de usuario</label>
               <input type="text" id="username" value={username} onChange={onUsernameChange} autoFocus />
               <label htmlFor="password">Contraseña</label>
               <input type="password" id="password" value={password} onChange={onPasswordChange} />
               <input type="submit" value="Iniciar sesión" />
           </form>
        </main>
    )
}
