
import React, { useEffect, useState } from "react"
import { Button, Form, Input } from "semantic-ui-react"
import { rollApi } from "../../services/rollApi"
import { useAuthState } from "./authContext"
import "./unauthenticatedApp.scss"

import $ from "jquery"
import '../emoji/emojiContainer.scss'
import okay from '../../svg/okay.svg';
import thumbsUp from "../../svg/thumbsUp.svg"
import champagne from "../../svg/champagne.svg"
import rose  from "../../svg/rose.svg"
import laughing from "../../svg/laughing.svg"
import poop from "../../svg/poop.svg"
import megaphone from  "../../svg/megaphone.svg"

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
    "top" : -Math.random()*20-20+"%",
    "left" : Math.random()*90+"%",
    "opacity" : Math.random()+0.5,
    "transform" : Math.random() > .5 ? "rotate("+Math.random()*90+"deg)" : "rotate(-"+Math.random()*90+"deg)"
  }).appendTo('.clear-container');

  drop(svg, i);
}

const makeConfetti = (svg) => {
  let quantity = 1
  for (let i = 0; i < quantity; i++) {
    create(svg);
  }
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const UnauthenticatedApp = () => {

  let [userName, setUserName] = useState("")
  let [errors, setErrors] = useState("")
  const {stateModifiers} = useAuthState()

  const emojis = [
    {src: okay, alt: "okays"},
    {src: thumbsUp, alt: "thumbsUp"},
    {src: laughing, alt: "laughing"},
    {src: champagne, alt: "champagne"},
    {src: rose, alt: "roses"},
    {src: poop, alt: "poop"},
    {src: megaphone, alt: "megaphone"}
  ]

  useEffect(() => {
    const emojiDrop = setInterval( () => {
      const randomEmoji = emojis[getRandomInt(emojis.length)]
      makeConfetti(randomEmoji)
    }, 500)


    return () => {
      clearInterval(emojiDrop)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      let un = await rollApi.post(`/username`, {userName: userName})
      stateModifiers.setUser(un.data)
      setErrors("")
    } catch (error) {
      ( error.message === "Request failed with status code 406" ?
        setErrors("That name is already in use"):
        setErrors(error.message)
      )
    }
  }

  return (
    <div className="unauth-container">
      <div className="clear-container"></div>
      <div className="ui segment name-form-container">
        <div className={"name-form-prompt"}>Oh Em GeE, YoU nEeD tO tElL mE yOuR nAmE rIgHt NoW</div>
        <div className={"error-message"}>{errors}</div>
        <Form
          className="name-input-form"
        >
          <Input
            className={"name-input"}
            value={userName}
            placeholder={"User Name"}
            onChange={(e) => setUserName(e.currentTarget.value)}
          />
          <Button
            className="name-input-submit"
            disabled={userName.length === 0}
            onClick={(e) => handleSubmit(e)}
          >Submit</Button>
        </Form>
      </div>
    </div>
  )
}

export default UnauthenticatedApp