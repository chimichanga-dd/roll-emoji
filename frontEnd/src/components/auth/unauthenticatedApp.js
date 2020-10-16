
import React, { useState } from "react"
import { Button, Form, Input } from "semantic-ui-react"
import { rollApi } from "../../services/rollApi"
import { useAuthState } from "./authContext"
import "./unauthenticatedApp.scss"

const UnauthenticatedApp = () => {

  let [userName, setUserName] = useState("")
  let [errors, setErrors] = useState("")
  const {stateModifiers} = useAuthState()

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
    <div className="ui segment" style={{margin: '0px 0px 0px 40px'}}>
      <div>Oh Em GeE, YoU nEeD tO tElL mE yOuR nAmE rIgHt NoW</div>
      <div className={"error-message"}>{errors}</div>
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