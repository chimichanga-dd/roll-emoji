
import React, { useState } from "react"
import { Button, Form, Input } from "semantic-ui-react"
import { useAuthState } from "./authContext"

const UnauthenticatedApp = () => {

  let [userName, setUserName] = useState("")
  const {stateModifiers} = useAuthState()

  const handleSubmit = (e) => {
    e.preventDefault()
    stateModifiers.setUser(userName)
  }

  return (
    <div className="ui segment" style={{margin: '0px 0px 0px 40px'}}>
      Oh Em GeE, YoU nEeD tO tElL mE yOuR nAmE rIgHt NoW
      <Form>
        <Input
          value={userName}
          placeholder={"UserName"}
          onChange={(e) => setUserName(e.currentTarget.value)}
        />
        <Button
          onClick={(e) => handleSubmit(e)}
        >Submit</Button>
      </Form>
    </div>
  )
}

export default UnauthenticatedApp