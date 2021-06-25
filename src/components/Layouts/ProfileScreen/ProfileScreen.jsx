import './ProfileScreen.css'
import React from 'react'
import Nav from '../../Nav/Nav'
import {auth} from '../../../firebase'
import {useSelector} from 'react-redux'
import {selectUser} from '../../../features/userSlice'
import PlansScreen from '../PlansScreen/PlansScreen'


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
                                <PlansScreen />
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
