var express = require('express');
var mongoose = require('mongoose')

var app = express();
var mongoDB = "mongodb+srv://dollarz:dollarz123@omerm-cluster.pzgxz.mongodb.net/dollarz?retryWrites=true&w=majority";

app.get('/', (req, res) =>
  res.send('Hello World!')
)

// Launch the server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);

  mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
});

module.exports = app;


