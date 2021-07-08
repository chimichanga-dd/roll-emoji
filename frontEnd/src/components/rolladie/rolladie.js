import React, { useEffect, useState } from "react"
import { Button } from "semantic-ui-react"
import { useAuthState } from "../auth/authContext"
import socket from "../socket/socketIO"
import "./rolladie.scss"

const RollADie = () => {

  const {state: {user}} = useAuthState()
  const [spinning, setSpinning ] = useState(false)
  const [number, setNumber] = useState(undefined)

  useEffect( () => {
    socket.on('spin', (num) => {
      setSpinning(true)
      setNumber(null)
      setTimeout( () => {
        setSpinning(false)
        setNumber(num)
      }, 2800)
    })

    return () => socket.off('spin')

  }, [])

  const generateNum = () => Math.floor(Math.random() * (100 - 1 ) + 1)


  const roll = () => {
    if(!spinning){
      let rollNum = generateNum()
      socket.emit('spin', rollNum)
      setTimeout( () => {
        socket.emit('rolled', {user, num: rollNum})
      }, 2800)
    }
  }


  return (
    <div className="ui segment rolladie-container">
      <div className="fake-background">
        <div className="container">
          <div className={`dice spinning-${spinning}`}>
            <div className="front face"> <p className="face-text">{number}</p></div>
            <div className="left face"> <p className="face-text">{generateNum()}</p></div>
            <div className="right face"> <p className="face-text">{generateNum()}</p></div>
            <div className="back face"> <p className="face-text">{generateNum()}</p></div>
          </div>
        </div>
      </div>
      <Button
        className={"roll-button"}
        onClick={() => roll()}
        disabled={spinning}
        >Roll!</Button>
    </div>
  )
}

export default RollADie