var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.io = require("socket.io")();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//새 웹 소켓 접속시
app.io.on("connection", (socket) => {
    console.log("새로 접속.");
    socket.on("disconnect", () => {
        console.log("접속 끊어짐.");
    });

    socket.on("update", (data) => {
        console.log(data.event, data.delta);

        socket.broadcast.emit("update", data);
    })
})

module.exports = app;
