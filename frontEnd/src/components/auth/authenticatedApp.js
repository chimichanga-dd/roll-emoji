
import React from "react"
import ChatContainer from "../chat/chatContainer"
import RollADie from "../rolladie/rolladie"
import HeaderBar from "../layout/headerBar"
import "./authenticatedApp.scss"

const AuthenticatedApp = () => {

  return (
    <div className="auth-container">
      <div className="clear-container"></div>
      <HeaderBar/>
      <div className="roll-chat-container">
        <RollADie/>
        <ChatContainer/>
      </div>
    </div>
  )
}

export default AuthenticatedApp