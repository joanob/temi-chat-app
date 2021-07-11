import React, {useState} from 'react'
import axios from "axios"

// Redux
import { useDispatch } from "../../hooks"
import { loggingIn } from "../../reducers/user"

// Components
import {InputText, InputPassword, InputSubmit} from "../Forms"

// Styles
import styles from "./UserForms.module.scss"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState("")
    const dispatch = useDispatch()

    const onUsernameChange = (username: string) => {setUsername(username)}

    const onPasswordChange = (password: string) => {setPassword(password)}

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (username === "" || password === "") {
            setFormError("Rellena los campos")
            return
        }
        axios.post("http://localhost:8080/login", JSON.stringify({username, pass: password}))
        .then(res => {
            dispatch(loggingIn({token: res.data}))
        }).catch(()=>{
            setFormError("Datos incorrectos")
        })
    }

    return (
        <main className={styles.main}>
           <h1>Iniciar sesión</h1> 
           <form onSubmit={onSubmit}>
               {formError === "" ? null : <label className={styles.formError}>{formError}</label>}
               <InputText label="Nombre de usuario" value={username} onChange={onUsernameChange} autofocus={true} />
               <InputPassword label="Contraseña" value={password} onChange={onPasswordChange} />
               <InputSubmit value={"Iniciar sesión"} />
           </form>
        </main>
    )
}
