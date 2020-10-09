import React from "react"
import { useEffect, useState, createContext, useContext } from "react"


const sleep = time => new Promise(resolve => setTimeout(resolve, time))

const getUser = () => sleep(1000).then(() => ({username: 'elmo'}))

const AuthContext  =  createContext()

const useAuthState = () => {
  const state = useContext(AuthContext)
  const isPending = state.status === "pending",
  const isError = state.status === "error",
  const isSuccess = state.status === "success",
  const isAuthenticated = state.user && isSuccess

  return {
    ...state,
    isPending,
    isError,
    isSuccess,
    isAuthenticated
  }
}

const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    status: 'pending',
    error: null,
    user: null,
  })

  useEffect(() => {
    getUser().then(
      (user) => setState({status: 'success', error: null, user}),
      (error) => setState({status: 'error', error, user: null})
    )
  }, [])

  return (
    <AuthContext.Provider value={state}>
      {state.status === 'pending' ? (
        'Loading...'
        ) : state.status === 'error' ? (
          <div> {state.error.message} </div>
        ) : (
          children
        )}
    </AuthContext.Provider>
  )
}

module.exports = {
  useAuthState,
  AuthContext,
  AuthProvider
}