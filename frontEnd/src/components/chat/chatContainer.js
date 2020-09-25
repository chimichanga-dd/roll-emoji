import React from "react"
import "./chatContainer.scss"
import EmojiContainer from "../emoji/emojiContainer"
import Chat from "./chat"

const ChatContainer = () => {

  return (
    <div className="ui segment chat-container" style={{margin: '0px 0px 0px 40px'}}>
      <Chat/>
      <EmojiContainer/>
    </div>
  )
}

export default ChatContainer