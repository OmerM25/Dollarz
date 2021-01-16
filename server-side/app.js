var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');

var app = express();
var mongoDB = "mongodb+srv://dollarz:dollarz123@omerm-cluster.pzgxz.mongodb.net/dollarz?retryWrites=true&w=majority";

const routes = require("./routes/router").default;
const goals = require("./src/controllers/goalController").default;

// Set all routes from routes folder
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use("/", routes);
app.use("/goals", goals);

// Launch the server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);

  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
});

module.exports = app;
