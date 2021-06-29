import './SignIn.css'
import React, {useRef, useState} from 'react'
import {auth} from '../../../firebase'
import {useHistory} from 'react-router-dom'

function SignIn() {

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const history = useHistory()
    const [registerForm, setRegisterForm] = useState(false)

    const register = (e) => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value)
            .then((authUser) => {
                auth.currentUser.updateProfile({
                    displayName: nameRef.current.value,
                    photoURL: `https://avatars.dicebear.com/api/gridy/andresmg.svg`,
                })
                console.log(authUser)
                history.push('/login')
                setRegisterForm(!registerForm)
            })
            .catch(error => console.log(error.message))
    }

    const signIn = (e) => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value)
            .then((authUser) => {
                // console.log(authUser)
                history.push('/')
            })
            .catch(error => console.log(error.message))
    }

    return (
        <>
            <div className="SignIn container-fluid">
                <div className="row align-items-center">
                    <form className="SignIn__form col-12 col-sm-3 m-auto">
                        <h4>{registerForm ? "Resgístrate" : "Ingresa"}</h4>
                        {registerForm && <p>Ingresa tu correo y contraseña para crear tu cuenta</p>}
                        {registerForm && <input ref={nameRef} className="SignIn__input" placeholder="Full name" type="text" />}
                        <input ref={emailRef} className="SignIn__input" placeholder="Email" type="email" />
                        <input ref={passwordRef} className="SignIn__input" placeholder="Password" type="password" />
                        <button type="submit" className="SignIn__button" onClick={registerForm ? register : signIn}>{registerForm ? "Crear usuario" : "Ingresa"}</button>
                        {!registerForm &&
                            <>
                                <p><span className="SignIn__gray">¿Nuevo en netflix?</span> <span className="SignIn__link" onClick={() => setRegisterForm(!registerForm)}>Regístrate ahora</span></p>
                            </>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn
