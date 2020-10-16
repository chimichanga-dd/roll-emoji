import React from "react"
import {Button} from "semantic-ui-react"


const EmojiButton = ({emitEmoji, svg}) => {
  return (
    <Button
      className="ui secondary button"
      onClick={() => emitEmoji(svg)}>
      <img className={"button-emoji"} src={svg.src} alt={svg.alt}/>
    </Button>
  )
}

export default EmojiButton