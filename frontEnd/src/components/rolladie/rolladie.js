import React, { useState } from "react"
import { Button } from "semantic-ui-react"
import "./rolladie.scss"

const RollADie = () => {

  const [spinning, setSpinning ] = useState(false)
  const [number, setNumber] = useState(undefined)


  console.log(spinning)

  const roll = () => {
    setSpinning(true)
    setTimeout( () => {
      setSpinning(false)
      setNumber(Math.floor(Math.random() * 101))
    }, 2800)
  }

  return (
    <div className="ui segment rolladie-container" style={{margin: 0}}>
      <div className="fake-background">
        <div className="container">
          <div className={`dice spinning-${spinning}`}>
            <div className="front face"> <p className="face-text">{number}</p></div>
            <div className="left face"> <p className="face-text">{number}</p></div>
            <div className="right face"> <p className="face-text">{number}</p></div>
            <div className="back face"> <p className="face-text">{number}</p></div>
          </div>
        </div>
      </div>
      <Button onClick={() => roll()}>Roll!</Button>
    </div>
  )
}

export default RollADie