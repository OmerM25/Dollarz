var express = require("express");
var mongoose = require("mongoose");
var Parent = require("./src/parent/parent");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();
var mongoDB = "mongodb+srv://dollarz:dollarz123@omerm-cluster.pzgxz.mongodb.net/dollarz?retryWrites=true&w=majority";

const routes = require("./routes/router").default;
const goals = require("./src/goal/goalController").default;
const chores = require("./src/chore/choreController").default;
const user = require("./src/user/userController").default;
const request = require("./src/request/requestController").default;
const child = require("./src/child/childController").default;

app.use(cors());

// Set all routes from routes folder
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use("/", routes);
app.use("/goals", goals);
app.use("/child", child);
app.use("/request", request);
app.use("/chore", chores);
app.use("/user", user);

// Launch the server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);

  mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
  mongoose.set("useCreateIndex", true);
});

module.exports = app;
