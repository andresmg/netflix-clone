import './ProfileScreen.css'
import React from 'react'
import Nav from '../../Nav/Nav'
import {auth} from '../../../firebase'
import {useSelector} from 'react-redux'
import {selectUser} from '../../../features/userSlice'

function ProfileScreen() {

const user = useSelector(selectUser)

    return (

        <div className="ProfileScreen container-fluid">
            <Nav />
            <div className="row ProfileScreen__row align-items-center">
                <div className="ProfileScreen__content col-12 col-sm-6 m-auto">
                    <h1>Editar Cuenta</h1>
                    <div className="row justify-content-between">
                        <div className="ProfileScreen__avatar col-2"></div>
                        <div className="ProfileScreen__info col-9">
                            <div className="row">
                                <div className="ProfileScreen__userEmail col-12">{user.email}</div>
                                <div className="col-12">
                                    <b>Planes (Plan actual:  premium)</b>
                                </div>
                                <div className="col-12">
                                    <div className="ProfileScreen__plan row justify-content-between">
                                        <div className="col-6">Netflix Standar <small>1080p</small></div>
                                        <button className="ProfileScreen__button col-6 text-right">Seleccionar</button>
                                    </div>
                                    <div className="ProfileScreen__plan row justify-content-between">
                                        <div className="col-6">Netflix Basic <small>480p</small></div>
                                        <button className="ProfileScreen__button col-6 text-right">Seleccionar</button>
                                    </div>
                                    <div className="ProfileScreen__plan row justify-content-between">
                                        <div className="col-6">Netflix Premium <small>4k + HDR</small></div>
                                        <button className="ProfileScreen__button current col-6 text-right" disabled>Plan actual</button>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button className="ProfileScreen__button exit" onClick={() => auth.signOut()}>Salir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen
