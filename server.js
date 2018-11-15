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
mongoose.connect(process.env.MOGODB_URI || 'mongodb://socketapp:1234sk@ds137483.mlab.com:37483/heroku_78t5nvpt' ||'mongodb://localhost/todolist', { useNewUrlParser: true }); 
console.log(process.env.MONGODB_URI);

require('./sockets/todo-sockets')(io);
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

server.listen((process.env.PORT || 8080), () => {console.log(`App is now listening on PORT ${PORT}`)});