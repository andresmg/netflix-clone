import './Nav.css'
import React, {useEffect, useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {auth} from '../../firebase'

function Nav({login = false, onClick, hasSubscription}) {

    const [show, setShow] = useState(false)

    const history = useHistory()

    const transitionNavBar = () => {
        if (window.scrollY > 100) {
            setShow(!show)
        } else {
            setShow(show)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar)
        return () => window.removeEventListener('scroll', transitionNavBar)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <nav className={`Nav ${show && 'Nav__black'}`}>
            <NavLink className="Nav__brand" to={hasSubscription ? "/" : "/profile"} />
            {login ? <button className="Nav__button" onClick={onClick}>Ingresa</button> : <button className="Nav__avatar" style={auth?.currentUser?.photoURL && {
                backgroundImage: `url(${auth?.currentUser?.photoURL})`
            }} onClick={() => history.push('/profile')}></button>}
        </nav>
    )
}

export default Nav