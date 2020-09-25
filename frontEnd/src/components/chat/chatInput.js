import React, { useEffect, useState } from "react"
const io = require('socket.io-client');
const socket = io();

const ChatInput = () => {

  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('message Sent', { type:'message', person: 'David', message })
    setMessage('')
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder={'Type here'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </form>
  )

}

export default ChatInput