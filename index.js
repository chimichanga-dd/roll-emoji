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

io.on("connection", (socket) => {
  console.log("New client connected")
  socket.emit('connected','Someone just connected')

  socket.on("disconnect", (msg) => {
    io.emit('message Received', msg)
  });

  socket.on('message Sent', (msg) => {
    io.emit('message Received', msg)
  });


});

const PORT = process.env.PORT || 5000

server.listen( PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
