
import React from "react"
import ChatContainer from "../chat/chatContainer"
import RollADie from "../rolladie/rolladie"
import LogOutButton from "./logOutButton"

const AuthenticatedApp = () => {

  return (
    <>
      <div className="clear-container" style={{height: '100%', width: '100%', position: 'absolute', zIndex: -1}}></div>
      <LogOutButton/>
      <RollADie/>
      <ChatContainer/>
    </>
  )
}

export default AuthenticatedApp