import React, { useEffect } from "react"
import $ from "jquery"
import './emojiContainer.scss'
import okay from '../../svg/okay.svg';
import thumbsUp from "../../svg/thumbsUp.svg"
import champagne from "../../svg/champagne.svg"
import rose  from "../../svg/rose.svg"
import laughing from "../../svg/laughing.svg"
import poop from "../../svg/poop.svg"
import EmojiButton from "./emojiButton";
import socket from "../socket/socketIO";
import { useAuthState } from "../auth/authContext";


const EmojiContainer = () => {

  const {state: {user}} = useAuthState()

  const emojis = [
    {src: okay, alt: "okays", displayMessage: "an Okay"},
    {src: thumbsUp, alt: "thumbsUp", displayMessage: "a Thumbs Up"},
    {src: laughing, alt: "laughing", displayMessage: "Laughing"},
    {src: champagne, alt: "champagne", displayMessage: "popping Champagne"},
    {src: rose, alt: "roses", displayMessage: "throwing Roses"},
    {src: poop, alt: "poop", displayMessage: "throwing Poop"}
  ]


  useEffect( () => {
    socket.on('emojiClicked', (clickedEmoji) => {
      makeConfetti(clickedEmoji)
    })
  }, [])

  function create(svg, i) {
    var width = 50;

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
      top: "90%",
      left: +Math.random()*90+"%"
    }, Math.random()*3000 + 3000, function() {
      remove(svg,x);
    });
  }

  function remove(svg, x) {
    $('.emoji-' + svg.alt + "-" + x).remove()
  }

  const makeConfetti = (svg) => {
    for (var i = 0; i < 50; i++) {
      create(svg,i);
    }
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