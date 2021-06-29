import './ProfileScreen.css'
import React, {useContext, useState} from 'react'
import Nav from '../../Nav/Nav'
import {auth} from '../../../firebase'
import {useSelector} from 'react-redux'
import {selectUser} from '../../../features/userSlice'
import PlansScreen from '../PlansScreen/PlansScreen'
import {userContext} from '../PlansScreen/PlansScreen'


function ProfileScreen() {

    const user = useSelector(selectUser)
    const [subscription, setSubscription] = useState(null)

    const context = useContext(userContext)
    console.log(`AQUIIIIIIIIIIIII ESTA ${context}`)


    const isSubscribed = (data) => {
        setSubscription(data)
    }

    return (

        <div className="ProfileScreen container-fluid">
            <Nav hasSubscription={subscription} />
            <div className="row ProfileScreen__row align-items-center">
                <div className="ProfileScreen__content col-12 col-sm-6 m-auto">
                    <h1>Editar Cuenta</h1>
                    <div className="row justify-content-between">
                        <div className="ProfileScreen__avatar col-2" style={auth?.currentUser?.photoURL && {
                            backgroundImage: `url(${auth?.currentUser?.photoURL})`
                        }}></div>
                        <div className="ProfileScreen__info col-9">
                            <div className="row">
                                <div className="ProfileScreen__userEmail col-12">
                                    <h3>Hola, {auth.currentUser.displayName}
                                        <span>{user.email}</span>
                                    </h3>
                                </div>
                                <PlansScreen isSubscribed={isSubscribed} />
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
