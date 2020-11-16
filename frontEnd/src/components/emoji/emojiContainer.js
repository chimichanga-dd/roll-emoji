import React, { useEffect } from "react"
import './emojiContainer.scss'
import okay from '../../svg/okay.svg';
import thumbsUp from "../../svg/thumbsUp.svg"
import champagne from "../../svg/champagne.svg"
import rose  from "../../svg/rose.svg"
import laughing from "../../svg/laughing.svg"
import poop from "../../svg/poop.svg"
import megaphone from  "../../svg/megaphone.svg"
import EmojiButton from "./emojiButton";
import socket from "../socket/socketIO";
import { useAuthState } from "../auth/authContext";
import makeConfetti from "../../helpers/emojiMaker"



const EmojiContainer = () => {

  const {state: {user}} = useAuthState()

  const emojis = [
    {src: okay, alt: "okays", displayMessage: "gives an okay"},
    {src: thumbsUp, alt: "thumbsUp", displayMessage: "gives a thumbs up"},
    {src: laughing, alt: "laughing", displayMessage: "started laughing"},
    {src: champagne, alt: "champagne", displayMessage: "popped some champagne"},
    {src: rose, alt: "roses", displayMessage: "threw some roses"},
    {src: poop, alt: "poop", displayMessage: "threw some poop"},
    {src: megaphone, alt: "megaphone", displayMessage: "used the air horn"}
  ]

  useEffect( () => {
    socket.on('emojiClicked', (clickedEmoji) => {
      makeConfetti(false, 9, clickedEmoji)
    })

    return () => socket.off('emojiClicked')
  }, [])

  const emitEmoji = (emoji) => {
    socket.emit('emojiClicked', {emoji, user})
  }


  return (
    <div className="e-container">
      {emojis.map(svg => <EmojiButton emitEmoji={emitEmoji} svg={svg} key={svg.alt}/>)}
    </div>
  )

}

export default EmojiContainer