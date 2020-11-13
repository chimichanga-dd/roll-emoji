import React from "react"
import "./chatMessage.scss"


const ChatMessage = ({messageObject}) => {

  const formatMessage = (messageObject) => {
    switch(messageObject.type){
      case 'message':
        return <div
          className={"standard-message"}
          >{messageObject.person}: {messageObject.message}</div>
      case 'reaction':
        return <div
          className={"reaction-message"}
        >{messageObject.person} {messageObject.message}</div>
      case 'rollMessage':
        return <div
          className={"roll-message"}
        >{messageObject.person} rolled a {messageObject.num}</div>
      case 'disconnected':
        return <div
          className={"disconnect-message"}
        >{messageObject.person} has left</div>
      case 'connected':
        return <div
          className={"connect-message"}
        >{messageObject.person} has joined</div>
      default:
        return <div>IDK WHAT WOULD GET THIS</div>
    }
  }

  return (
    formatMessage(messageObject)
  )
}

export default ChatMessage