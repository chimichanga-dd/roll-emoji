import React from "react"
import { useEffect, useState, createContext, useContext } from "react"


// const sleep = time => new Promise(resolve => setTimeout(resolve, time))

// const getUser = () => sleep(5000).then(() => ({username: 'elmo'}))


export const AuthContext  =  createContext()

export const useAuthState = () => {
  const state = useContext(AuthContext)
  const isPending = state.status === "pending"
  const isError = state.status === "error"
  const isSuccess = state.status === "success"
  const isAuthenticated = state.user && isSuccess

  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated
  }
}

export const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    status: 'pending',
    error: null,
    user: null,
  })


  const setUser = (userName) => {
    setState({status: 'success', error: null, user: userName})
  }

  const logOut = () => {
    setState({status: 'success', error: null, user: null})
  }

  let stateModifiers = {
    setUser,
    logOut
  }

  return (
    <AuthContext.Provider value={{state, stateModifiers}}>
      {children}
    </AuthContext.Provider>
  )
}

// module.exports = {
//   useAuthState,
//   AuthContext,
//   AuthProvider
// }