const express = require("express");
const { dbConnection } = require("./configs/db");
dbConnection();
const dotenv = require("dotenv");
dotenv.config();
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);


const bodyParser = require("body-parser");
const { errorHandler } = require("./middlewares/error-handler.middleware");
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // extended  true is for nested data
app.use(express.urlencoded({ extended: true })); //for file data
app.use("/uploads", express.static("uploads")); // for read static files

app.use("/", require("./routes"));
app.use(errorHandler);


io.on("connection", (socket) => {
  console.log(`connect ${socket.id}`);
  socket.on("ping", (cb) => {
    console.log("ping");
    cb();
  });
  
  socket.on("join-chats", (roomIds) => {
    console.log("sdnsajnd0",socket.id)
    console.log("sdandsj ashw3e",socket.rooms)
    socket.join(roomIds);
    console.log("joined chats room :", socket.id, roomIds);
  });

  socket.on("message-sender", ({ room, message }) => {
    console.log("message-sender", room, message);
    io.to(room).emit("message-reciever", message); //for all members 
  });

 
  socket.on("disconnect", () => {
    console.log(`disconnect ${socket.id}`);
  });
});

const APP_PORT = process.env.APP_PORT || 8080;

server.listen(APP_PORT, () => {
  console.log("server started", APP_PORT);
});
