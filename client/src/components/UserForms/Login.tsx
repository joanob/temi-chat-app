import React, {useState} from 'react'

// Styles
import "./UserForms.scss"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState("")

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {setUsername(e.target.value)}

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <main>
           <h1>Iniciar sesión</h1> 
           <form onSubmit={onSubmit}>
               {formError === "" ? null : <label className="form-error">{formError}</label>}
               <label htmlFor="username">Nombre de usuario</label>
               <input type="text" id="username" value={username} onChange={onUsernameChange} autoFocus />
               <label htmlFor="password">Contraseña</label>
               <input type="password" id="username" value={password} onChange={onPasswordChange} />
               <input type="submit" value="Iniciar sesión" />
           </form>
        </main>
    )
}
