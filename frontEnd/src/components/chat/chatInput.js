import React, { useEffect, useState } from "react"
import socket from '../socket/socketIO'


const ChatInput = ({user}) => {

  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('message Sent', { type:'message', person: user, message })
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