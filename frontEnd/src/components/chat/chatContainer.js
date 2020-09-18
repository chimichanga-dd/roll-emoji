import React from "react"
import "./chatContainer.scss"
import EmojiContainer from "../emoji/emojiContainer"

const ChatContainer = () => {

  return (
    <div className="ui segment chat-container" style={{margin: '0px 0px 0px 40px'}}>
      <EmojiContainer/>
    </div>
  )
}

export default ChatContainer