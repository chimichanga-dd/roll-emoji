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

  const getUser = () => {
    let user = localStorage.getItem('userName')
    setState({status: 'success', error: null, user})
    return user
  }

  const setUser = (userName) => {
    let user = localStorage.setItem('userName', userName)
    setState({status: 'success', error: null, user})
    return user
  }

  const logOut = () => {
    localStorage.removeItem('userName')
    setState({status: 'success', error: null, user: null})
  }

  let stateModifiers = {
    getUser,
    setUser,
    logOut
  }

  useEffect(() => {

    let user = getUser()
    console.log("user", user)

  }, [state.user])

  return (
    <AuthContext.Provider value={{state, stateModifiers}}>
      {/* {state.status === 'pending' ? (
        'Loading...'
        ) : state.status === 'error' ? (
          <div> {state.error.message} </div>
        ) : ( */}
          {children}
        {/* )} */}
    </AuthContext.Provider>
  )
}

// module.exports = {
//   useAuthState,
//   AuthContext,
//   AuthProvider
// }