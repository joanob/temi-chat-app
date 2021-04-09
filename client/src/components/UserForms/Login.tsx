import React, {useState} from 'react'
import axios from "axios"
import { useDispatch } from "../../hooks"

// Styles
import styles from "./UserForms.module.scss"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState("")
    const dispatch = useDispatch()

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (username === "" || password === "") {
            setFormError("Rellena los campos")
            return
        }
        axios.post("http://localhost:8080/login", JSON.stringify({username, pass: password}))
        .then(res => {
            dispatch({type: "WS_CONNECT", payload: {token: res.data}})
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
