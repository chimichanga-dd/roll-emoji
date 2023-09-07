const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./router/routes");
const {
  userSockets,
  removeUserByName,
  removeUserById
} = require("./apiSocket/socketContainer");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
app.use(express.static(path.join(__dirname, "frontEnd/build")));

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  socket.on("connected", (user) => {
    io.emit("message Received", { type: "connected", person: user });
    userSockets[socket.id] = user;
  });

  socket.on("disconnect", (msg) => {
    if (msg != "ping timeout") {
      io.emit("message Received", {
        type: "disconnected",
        person: userSockets[socket.id]
      });
      removeUserById(socket.id);
    }
  });

  socket.on("loggedOut", ({ person }) => {
    io.emit("message Received", { type: "disconnected", person });
    removeUserByName(person);
  });

  socket.on("message Sent", (msg) => {
    io.emit("message Received", msg);
  });

  socket.on("spin", (num) => {
    io.emit("spin", num);
  });

  socket.on("rolled", ({ user, num }) => {
    io.emit("message Received", { type: "rollMessage", person: user, num });
  });

  socket.on("emojiClicked", ({ emoji, user }) => {
    io.emit("emojiClicked", emoji);
    io.emit("message Received", {
      type: "reaction",
      person: user,
      message: emoji.displayMessage
    });
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`);
});
