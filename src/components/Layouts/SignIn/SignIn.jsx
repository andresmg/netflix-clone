import './SignIn.css'
import React, {useRef} from 'react'
import {auth} from '../../../firebase'
import {useHistory} from 'react-router-dom'

function SignIn() {

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const history = useHistory()

    const register = (e) => {
        e.preventDefault()

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value)
            .then((authUser) => {
                console.log(authUser)
            })
            .catch(error => console.log(error.message))
    }

    const signIn = (e) => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value)
            .then((authUser) => {
                console.log(authUser)
                history.push('/')
            })
            .catch(error => console.log(error.message))
    }

    return (
        <div className="SignIn container-fluid">
            <div className="row align-items-center">
                <form className="SignIn__form col-12 col-sm-3 m-auto">
                    <h4>Ingresa</h4>
                    <input ref={emailRef} className="SignIn__input" placeholder="Email" type="email" />
                    <input ref={passwordRef} className="SignIn__input" placeholder="Password" type="password" />
                    <button type="submit" className="SignIn__button" onClick={signIn}>Ingresa</button>
                    <p><span className="SignIn__gray">¿Nuevo en netflix?</span> <span className="SignIn__link" onClick={register}>Regístrate ahora</span></p>
                </form>
            </div>
        </div>
    )
}

export default SignIn
