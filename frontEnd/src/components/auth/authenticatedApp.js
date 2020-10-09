
import React from "react"
import ChatContainer from "../chat/chatContainer"
import RollADie from "../rolladie/rolladie"
import LogOutButton from "./logOutButton"

const AuthenticatedApp = () => {

  return (
    <>
      <LogOutButton/>
      <RollADie/>
      <ChatContainer/>
    </>
  )
}

export default AuthenticatedApp