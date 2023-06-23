// Servidor de Express
const express = require("express");
const http = require("http");
const logger = require("morgan");

const cors = require("cors");
const socketio = require("socket.io");
const { ConnectDB } = require("../database/config");
const Sockets = require("./sockets");

const RouterMain = require("../router");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Conectar a DB
    ConnectDB();
    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = socketio(this.server, {});
  }

  middlewares() {
    // Morgan
    this.app.use(logger("dev"));
    // CORS
    this.app.use(cors());
    // Pars del body
    this.app.use(express.json());
    //routes
    this.app.use("/", RouterMain);

    // ERROR HANDLER
    this.app.use((err, req, res, next) => {
      console.log(err);
      res.status(err.status || 500).send(err.stack);
    });
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    this.configurarSockets();
    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
