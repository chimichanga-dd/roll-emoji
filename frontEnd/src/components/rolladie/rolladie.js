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
      setTimeout( () => {
        setSpinning(false)
        setNumber(num)
      }, 2800)
    })

  }, [])

  const roll = () => {
    if(!spinning){
      let rollNum = Math.floor(Math.random() * 101)
      socket.emit('spin', rollNum)
      setTimeout( () => {
        socket.emit('rolled', {user, num: rollNum})
      }, 2800)

    }
  }

  return (
    <div className="ui segment rolladie-container" style={{margin: 0, minWidth: 400}}>
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