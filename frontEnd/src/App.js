import React, { useEffect, useState } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import RollADie from './components/rolladie/rolladie';
import ChatContainer from './components/chat/chatContainer';
import socket from './components/socket/socketIO'


function App() {

  return (
    <div className="App main-body">
      <RollADie/>
      <ChatContainer/>
      {/* <div> {testMessage} </div> */}
    </div>
  );
}

export default App;