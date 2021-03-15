import axios from 'axios'
import React, {useState} from 'react'
import {useHistory} from "react-router"

// Styles
import styles from "./UserForms.module.scss"

export default function SignUp() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState("")
    const history = useHistory()

    let usernameTimeout:NodeJS.Timeout;

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
        if (usernameTimeout) {
            clearTimeout(usernameTimeout)
        }
        usernameTimeout = setTimeout(()=>{
            axios.get("http://localhost:8080/username/"+e.target.value)
            .then(res => {
                setFormError("El nombre de usuario está en uso")
            })
        }, 500)
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (username === "" || password === "") {
            setFormError("Escribe un usuario y una contraseña")
        } else {
            axios.post("http://localhost:8080/signup", JSON.stringify({username, pass: password})).then(res=>{
                history.push("/login")
            }).catch(res=>{
                console.log(res);
                // Handle errors
            })
        }
    }

    return (
        <main className={styles.main}>
           <h1>Registrarse</h1> 
           <form onSubmit={onSubmit}>
           {formError === "" ? null : <label className="form-error">{formError}</label>}
               <label htmlFor="username">Nombre de usuario</label>
               <input type="text" id="username" value={username} onChange={onUsernameChange} autoFocus />
               <label htmlFor="password">Contraseña</label>
               <input type="password" id="password" value={password} onChange={onPasswordChange} />
               <input type="submit" value="Registrarse" />
           </form>
        </main>
    )
}
