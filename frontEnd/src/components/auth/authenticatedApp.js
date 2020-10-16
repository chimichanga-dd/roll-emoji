
import React from "react"
import ChatContainer from "../chat/chatContainer"
import RollADie from "../rolladie/rolladie"
import HeaderBar from "../layout/headerBar"
import "./authenticatedApp.scss"

const AuthenticatedApp = () => {

  return (
    <>
      <div className="clear-container" style={{height: '100%', width: '100%', position: 'absolute', zIndex: -1}}></div>
      <HeaderBar/>
      <div className="roll-chat-container">
        <RollADie/>
        <ChatContainer/>
      </div>
    </>
  )
}

export default AuthenticatedApp