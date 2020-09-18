const express = require('express')
const http = require('http')
const path = require('path')
const socketIo = require('socket.io')
const app = express()
const routes = require('./router/routes')

app.use(routes);
app.use(express.static(path.join(__dirname, 'client/build')))

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit('connected','Someone just connected')

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 5000

server.listen( PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
