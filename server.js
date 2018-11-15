const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

//update with mylab user and password//
mongoose.connect('mongodb://localhost/todolist', { useNewUrlParser: true });

require('./sockets/todo-sockets')(io);
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

server.listen((process.env.PORT || 8080), () => {console.log(`App is now listening on PORT ${PORT}`)});