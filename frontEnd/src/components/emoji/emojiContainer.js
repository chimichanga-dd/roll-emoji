import React from "react"
import './emojiContainer.scss'
import okay from '../../svg/okay.svg';
import thumbsUp from "../../svg/thumbsUp.svg"
import champagne from "../../svg/champagne.svg"
import rose  from "../../svg/rose.svg"
import laughing from "../../svg/laughing.svg"
import poop from "../../svg/poop.svg"
import EmojiButton from "./emojiButton";


const EmojiContainer = () => {

  const emojis = [
    {src: okay, alt: "okay"},
    {src: thumbsUp, alt: "thumbsUp"},
    {src: laughing, alt: "laughing"},
    {src: champagne, alt: "champagne"},
    {src: rose, alt: "rose"},
    {src: poop, alt: "poop"}
  ]

  return (
    <div className="e-container">
      {emojis.map(svg => <EmojiButton svg={svg} key={svg.alt}/>)}
    </div>
  )

}

export default EmojiContainer