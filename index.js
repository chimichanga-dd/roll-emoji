const express = require('express')
const http = require('http')
const path = require('path')
const socketIo = require('socket.io')
const app = express()
const routes = require('./router/routes')

app.use(routes);
app.use(express.static(path.join(__dirname, 'frontEnd/build')))

const server = http.createServer(app);
const io = socketIo(server);

const userSockets = {}

io.on("connection", (socket) => {

  socket.on('connected', (user) =>{
    io.emit('message Received', { type:'connected', person: user })
    userSockets[socket] = user
  })

  socket.on("disconnect", (msg) => {
    if (msg != "ping timeout") {
      io.emit('message Received', {type:'disconnected', person: userSockets[socket]})
      delete userSockets[socket]
    }

  });

  socket.on('message Sent', (msg) => {
    console.log(msg)
    io.emit('message Received', msg)
  });

  socket.on('spin', (num) => {
    io.emit('spin', num)
  })

  socket.on('rolled', ({user, num}) => {
    io.emit('message Received', {type: 'rollMessage', person: user, num})
  })

  socket.on('emojiClicked', ({emoji, user}) => {
    io.emit('emojiClicked', emoji)
    io.emit('message Received', {type: 'reaction', person: user, message: emoji.displayMessage})
  })


////////////////

  socket.on('error', (error) => {
    console.log("error:", error)
  });

  socket.on("connect_timeout", () => {
    console.log("connection timeout")
  })

  socket.on("reconnect",(number) => {
    console.log("connection number:", number)
  } )

  socket.on("ping", () => {
    console.log("ping")
  })
  socket.on("pong", (ms) => {
    console.log(`pong after ${ms} ms`)
  })
  socket.on('error', (error) => {
  // ...
});

});





const PORT = process.env.PORT || 5000

server.listen( PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
