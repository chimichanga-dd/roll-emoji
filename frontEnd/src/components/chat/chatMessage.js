import React from "react"


const ChatMessage = ({messageObject}) => {

  const formatMessage = (messageObject) => {
    switch(messageObject.type){
      case 'message':
        return <div>{messageObject.person}: {messageObject.message}</div>
      case 'reaction':
        return <div>{messageObject.person} reacted with {messageObject.message}</div>
      case 'disconnected':
        return <div>{messageObject.person} has disconnected</div>
      case 'connected':
        return <div>{messageObject.person} has connected</div>
      default:
        return <div>IDK WHAT WOULD GET THIS</div>
    }
  }

  return (
    formatMessage(messageObject)
  )
}

export default ChatMessage