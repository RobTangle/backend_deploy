const cors =require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");

require("./db.js");

const server = express();
server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
var corsOptions = {
  origin: [
    "https://acreditaciones-mgnt.vercel.app"
  ],
  headers: "*",
  methods: "*",
  credentials: true,
};
// server.use(cors(corsOptions));
server.use(cors({ origin: "https://acreditaciones-mgnt.vercel.app" }));
server.use(express.json());
server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
