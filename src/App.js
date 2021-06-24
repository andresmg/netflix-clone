import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Route, Switch} from 'react-router-dom'
import HomeScreen from './components/Layouts/HomeScreen/HomeScreen'
import Login from './components/Layouts/Login/Login'
import ProfileScreen from './components/Layouts/ProfileScreen/ProfileScreen'
import {login, logout, selectUser} from './features/userSlice'
import {auth} from './firebase'

function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        //log out
        dispatch(logout())
      }
    })

    return unsubscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])


  return (
    <div className="App">
      {!user ? (<Login />) : (
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route exact path="/login" login component={Login} />
        </Switch>)}
    </div>
  )
}

export default App
