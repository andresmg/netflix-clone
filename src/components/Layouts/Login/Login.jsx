import './Login.css'
import React, {useState} from 'react'
import Nav from '../../Nav/Nav'
import SignIn from '../SignIn/SignIn'

function Login() {

    const [signIn, setSignIn] = useState(false)

    const loginForm = () => {
        setSignIn(!signIn)
    }

    return (
        <>
            <Nav login onClick={loginForm} />
            {signIn ? <SignIn /> :
                <div className="Login container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-8 Login__container">
                            <h1>Todas las películas y series que desees, y mucho más.</h1>
                            <h4>Disfruta donde quieras. Cancela cuando quieras.</h4>
                            <p>¿Quieres ver algo ya? Escribe tu correo para crear una suscripción a Netflix o reactivarla.</p>
                            <div className="Login__form">
                                <form>
                                    <input className="Login__input" type="email" placeholder="Email address" />
                                    <button onClick={loginForm} className="Login__getStarted">GET STARTED</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default Login
