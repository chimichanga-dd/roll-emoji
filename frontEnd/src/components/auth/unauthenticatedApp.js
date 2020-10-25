
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
    <div className="unauth-container">
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
            onClick={(e) => handleSubmit(e)}
          >Submit</Button>
        </Form>
      </div>
    </div>
  )
}

export default UnauthenticatedApp