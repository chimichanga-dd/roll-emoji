import React from "react"
import { useState, createContext, useContext } from "react"
import socket from '../socket/socketIO'


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
    socket.emit('loggedOut', { person: state.user})
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