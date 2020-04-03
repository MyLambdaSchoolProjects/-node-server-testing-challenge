const express = require("express"); 

const Model = require("../datamodel/dataModel");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up", dbenv: process.env.DB_ENV });
});



module.exports = server;
