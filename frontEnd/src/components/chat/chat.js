import React, { useEffect, useState } from "react"
import ChatInput from "./chatInput"
import ChatMessage from "./chatMessage"
import socket from '../socket/socketIO'
import { useAuthState } from "../auth/authContext"

const Chat = () => {

  const {state: {user}} = useAuthState()
  const [chatMessages, setChatMessages] = useState([])


  useEffect(()=> {

    socket.on('message Received', (message) => {
      setChatMessages( (chatMessages) => [...chatMessages, message])
    })

    return (
      () => socket.emit('message Sent', { type:'disconnected', person: user})
    )

  }, [])


  return (
    <div className="ui segment" style={{margin: '0px 0px 0px 40px'}}>
      <div>
        {chatMessages.map((messageObject, index) => <ChatMessage messageObject={messageObject} key={index}/>)}
      </div>
      <ChatInput user={user}/>
    </div>
  )

}

export default Chat