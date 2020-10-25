import React, { useEffect, useRef, useState } from "react"
import ChatInput from "./chatInput"
import ChatMessage from "./chatMessage"
import socket from '../socket/socketIO'
import { useAuthState } from "../auth/authContext"

const Chat = () => {

  const {state: {user}} = useAuthState()
  const [chatMessages, setChatMessages] = useState([])
  const bottomOfBox = useRef(null)


  useEffect(()=> {

    socket.emit('connected', user)

    socket.on('message Received', (message) => {
      setChatMessages( (chatMessages) => [...chatMessages, message])
    })

    return (
      () => socket.emit('message Sent', { type:'disconnected', person: user})
    )

  }, [])

  useEffect( () => {
    bottomOfBox.current.scrollIntoView({ behavior: "smooth" })
  },[chatMessages])


  return (
    <div className="ui segment chat-box">
      <div className="chat-messages">
        {chatMessages.map((messageObject, index) => <ChatMessage messageObject={messageObject} key={index}/>)}
        <div ref={bottomOfBox}></div>
      </div>
      <ChatInput user={user}/>
    </div>
  )

}

export default Chat