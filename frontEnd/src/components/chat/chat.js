import React, { useEffect, useState } from "react"
import ChatInput from "./chatInput";
import ChatMessage from "./chatMessage";
const io = require('socket.io-client');
const socket = io();

const Chat = () => {

  const [chatMessages, setChatMessages] = useState([])


  useEffect(()=> {

    socket.on('message Received', (message) => {
      setChatMessages( (chatMessages) => [...chatMessages, message])
    })

    return (
      socket.emit('disconnect', { type:'disconnected', person: 'David' })
    )

  }, [])


  return (
    <div className="ui segment" style={{margin: '0px 0px 0px 40px'}}>
      <div>
        {chatMessages.map((messageObject, index) => <ChatMessage messageObject={messageObject} key={index}/>)}
      </div>
      <ChatInput/>
    </div>
  )

}

export default Chat