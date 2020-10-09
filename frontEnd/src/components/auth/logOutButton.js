import React from "react"
import { Button } from "semantic-ui-react"
import { useAuthState } from "./authContext"

const LogOutButton = () => {

  const {stateModifiers} = useAuthState()

  return (
    <Button
      onClick={() => stateModifiers.logOut()}
    >Sign Out</Button>
  )
}

export default LogOutButton

