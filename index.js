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

  socket.on("disconnect", () => {
    io.emit('message Received', {type:'disconnected', person: userSockets[socket]})
    delete userSockets[socket]
  });

  socket.on('message Sent', (msg) => {
    io.emit('message Received', msg)
  });


});

const PORT = process.env.PORT || 5000

server.listen( PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
