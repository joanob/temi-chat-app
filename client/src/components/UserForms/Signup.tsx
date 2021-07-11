import axios from 'axios'
import React, {useState} from 'react'
import {useHistory} from "react-router"

// Components
import { InputText, InputPassword, InputSubmit } from '../Forms'

// Styles
import styles from "./UserForms.module.scss"

export default function SignUp() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState("")
    const history = useHistory()

    let usernameTimeout: NodeJS.Timeout;

    const onUsernameChange = (user: string) => {
        setUsername(user)
        if (usernameTimeout) {
            clearTimeout(usernameTimeout)
        }
        usernameTimeout = setTimeout(()=>{
            axios.get("http://localhost:8080/username/"+user)
            .then(() => {
                setFormError("El nombre de usuario está en uso")
            })
        }, 500)
    }

    const onPasswordChange = (password: string) => {setPassword(password)}

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (username === "" || password === "") {
            setFormError("Escribe un usuario y una contraseña")
        } else {
            axios.post("http://localhost:8080/signup", JSON.stringify({username, pass: password})).then(()=>{
                history.push("/login")
            }).catch(res=>{
                console.log(res);
                setFormError("Ha habido un error. Prueba otro nombre de usuario")
            })
        }
    }

    return (
        <main className={styles.main}>
           <h1>Registrarse</h1> 
           <form onSubmit={onSubmit}>
           {formError === "" ? null : <label className={styles.formError}>{formError}</label>}
               <InputText label="Nombre de usuario" value={username} onChange={onUsernameChange} autofocus={true} />
               <InputPassword label="Contraseña" value={password} onChange={onPasswordChange} />
               <InputSubmit value="Registrarse" />
           </form>
        </main>
    )
}
