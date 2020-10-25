import React, { useState } from "react"
import socket from '../socket/socketIO'
import {Input} from "semantic-ui-react"
import "./chatInput.scss"

const ChatInput = ({user}) => {

  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('message Sent', { type:'message', person: user, message })
    setMessage('')
  }

  return (
    <form
      className={"chat-form"}
      onSubmit={(e) => handleSubmit(e)}>
      <Input
        className={"chat-input"}
        type="text"
        placeholder={'Type here'}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </form>
  )

}

export default ChatInput