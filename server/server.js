const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const shortid = require('shortid');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// When connection is fired
io.on('connection', (socket) => {
    console.log(`New User connected`);

    io.emit('id', shortid.generate());
});

io.on('changeOrientation', data => {
    io.emit('orientationChanged', data);
});

server.listen(port, () => {
    console.log(`server is up on ${port}`);
});