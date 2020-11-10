import React, { useEffect } from "react"
import $ from "jquery"
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

const remove = (svg, i) => {
  $('.emoji-' + svg.alt + "-" + i).remove()
}

const drop = (svg, i) => {
  $('.emoji-' + svg.alt + "-" +i).animate({
    top: "70%",
    left: +Math.random()*90+"%"
  }, Math.random()*3000 + 3000, function() {
    remove(svg,i);
  });
}

const create = (svg) => {
  
  const width = 180;
  const i = Math.random().toString(36).substring(7)

  $("<div class=emoji-" + svg.alt + "-" + i +"><img src='" + svg.src + "' alt=" + svg.alt + "/></div>").css({
    "width" : width+"px",
    "top" : -Math.random()*20+"%",
    "left" : Math.random()*90+"%",
    "opacity" : Math.random()+0.5,
    "transform" : Math.random() > .5 ? "rotate("+Math.random()*90+"deg)" : "rotate(-"+Math.random()*90+"deg)"
  }).appendTo('.clear-container');

  drop(svg, i);
}

const makeConfetti = (svg) => {
  let quantity = 9
  for (let i = 0; i < quantity; i++) {
    create(svg);
  }
}


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
      makeConfetti(clickedEmoji)
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