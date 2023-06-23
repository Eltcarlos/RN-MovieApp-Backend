const { updateCurrentlyWatching, getCurrentlyWatching } = require("../controllers/Socket");

class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", async (socket) => {
      console.log("Un Cliente se conecto a Socket io");

      socket.on("positionMillis", async (data) => {
        await updateCurrentlyWatching(data);
        const response = await getCurrentlyWatching(data);
        socket.emit("watchingMovies", response);
      });

      socket.on("disconnect", (data) => {
        console.log("UN CLIENTE SE DESCONECTO DE SOCKET IO");
      });
    });
  }
}

module.exports = Sockets;
