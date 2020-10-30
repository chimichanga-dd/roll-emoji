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


const EmojiContainer = () => {

  const {state: {user}} = useAuthState()

  const emojis = [
    {src: okay, alt: "okays", displayMessage: "gives an okay", count: 0},
    {src: thumbsUp, alt: "thumbsUp", displayMessage: "gives a thumbs up", count: 0},
    {src: laughing, alt: "laughing", displayMessage: "started laughing", count: 0},
    {src: champagne, alt: "champagne", displayMessage: "popped some champagne", count: 0},
    {src: rose, alt: "roses", displayMessage: "threw some roses", count: 0},
    {src: poop, alt: "poop", displayMessage: "threw some poop", count: 0},
    {src: megaphone, alt: "airhorn", displayMessage: "used the megaphone", count: 0}
  ]

  const getEmojiCount = (emojiTarget) => {
    return emojis.find((emoji) => emoji.alt === emojiTarget.alt).count
  }

  const increaseEmojiCount = (emojiTarget,val) => {
    let emoji = emojis.find((emoji) => emoji.alt === emojiTarget.alt)
    emoji.count+= val
    return emoji.count
  }

  useEffect( () => {
    socket.on('emojiClicked', (clickedEmoji) => {
      makeConfetti(clickedEmoji)
    })
  }, [])

  function create(svg, i) {
    var width = 180;

    $("<div class=emoji-" + svg.alt + "-" + i +"><img src='" + svg.src + "' alt=" + svg.alt + "/></div>").css({
      "width" : width+"px",
      "top" : -Math.random()*20+"%",
      "left" : Math.random()*90+"%",
      "opacity" : Math.random()+0.5,
      "transform" : Math.random() > .5 ? "rotate("+Math.random()*90+"deg)" : "rotate(-"+Math.random()*90+"deg)"
    }).appendTo('.clear-container');

    drop(svg, i);
  }

  function drop(svg, x) {
    $('.emoji-' + svg.alt + "-" +x).animate({
      top: "70%",
      left: +Math.random()*90+"%"
    }, Math.random()*3000 + 3000, function() {
      remove(svg,x);
    });
  }

  function remove(svg, x) {
    $('.emoji-' + svg.alt + "-" + x).remove()
  }

  const makeConfetti = (svg) => {
    let quantity = 9
    let count = getEmojiCount(svg)
    for (let i = count; i < count + quantity; i++) {
      create(svg,i);
    }
    increaseEmojiCount(svg, quantity)

  }


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