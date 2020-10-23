import React from "react"
import LogOutButton from "../auth/logOutButton"
import "./headerBar.scss"


const HeaderBar = () =>{

  return (
    <div className="header-bar">
      <LogOutButton/>
    </div>
  )

}

export default HeaderBar