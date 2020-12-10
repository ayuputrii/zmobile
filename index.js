const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const db = require("./src/config/mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const routeNav = require("./src/");
require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1", routeNav);

app.use(express.static("public"));

// Socket Io
io.on("connection", (socket) => {
  console.log("user connect");
  socket.on("initial-user", (id) => {
    console.log("Ini hasil dari intial-user", id);
    if (id) {
      socket.join(id);
      db.query(`SELECT balance FROM users WHERE id=${id}`, (err, res) => {
        io.to(id).emit("get-data", res[0].balance);
      });
    }
  });
  // disconnect
  socket.on("disconnect", () => {
    console.log("Users disconnect to socket or server");
  });
});

server.listen(process.env.PORT || 8000, () => {
  console.log("Server running");
});
