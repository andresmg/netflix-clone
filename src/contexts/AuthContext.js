import React, {createContext, useContext} from 'react'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({children}) => {

  const isSubscribed = () => { }

  return (
    <AuthContext.Provider value={isSubscribed}>
      {children}
    </AuthContext.Provider>
  )
}
