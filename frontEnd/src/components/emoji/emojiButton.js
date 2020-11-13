import React from "react"
import {Button} from "semantic-ui-react"
import "./emojiButton.scss"

const EmojiButton = ({emitEmoji, svg}) => {
  return (
    <Button
      className="emoji-button"
      onClick={() => emitEmoji(svg)}>
      <img className={"button-emoji"} src={svg.src} alt={svg.alt}/>
    </Button>
  )
}

export default EmojiButton