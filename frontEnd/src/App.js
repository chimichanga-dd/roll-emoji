import React, { useEffect, useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import RollADie from './components/rolladie/rolladie';
import ChatContainer from './components/chat/chatContainer';

const io = require('socket.io-client');



function App() {

  // const [testMessage, setTestMessage] = useState('')

  // useEffect(()=> {
  //   async function loadMessage(){
  //     let resProm = await fetch('/api/tester')
  //     let res = await resProm.json()
  //     setTestMessage(res.testMessage)
  //   }

  //   const socket = io();
  //   socket.on('connected', (message) => {
  //     console.log(message)
  //   })

  //   loadMessage()


  // }, [])

  return (
    <div className="App main-body">
      <RollADie/>
      <ChatContainer/>
      {/* <div> {testMessage} </div> */}
    </div>
  );
}

export default App;