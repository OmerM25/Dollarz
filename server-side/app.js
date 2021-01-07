var express = require("express");

var app = express();

//app.get("/", (req, res) => res.send("Hello World!"));

const routes = require("./routes/router").default;

//Set all routes from routes folder
app.use("/", routes);

// Launch the server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});

module.exports = app;
