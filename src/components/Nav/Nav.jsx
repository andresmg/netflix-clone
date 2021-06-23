import './Nav.css'
import React, {useEffect, useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom'

function Nav({login = false, onClick}) {

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
            <NavLink className="Nav__brand" to="/" />
            {login ? <button className="Nav__button" onClick={onClick}>Ingresa</button> : <button className="Nav__avatar" onClick={() => history.push('/profile')}></button>}
        </nav>
    )
}

export default Nav