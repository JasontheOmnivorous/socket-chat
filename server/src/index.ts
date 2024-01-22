import express from "express";
import { Server } from "socket.io";
const app = express();

const port = 8000;
const server = app.listen(port, () =>
  console.log(`Server listening at port ${port}`)
);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("sentMessage", (message, room) => {
    // so this line is basically saying emit this event to all the other sockets that isnt me
    // so that the user sent this message wont recieve it again
    // socket.broadcast.emit("recieveMessage", message);
    // if (room === "") {
    //   io.emit("receiveMessage", message);
    // } else {
    //   socket.to(room).emit("receiveMessage", message);
    // }

    io.emit("receiveMessage", message);
  });
});
