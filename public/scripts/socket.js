var socket = io();
socket.on('connect', socket => {
    console.log(`CONNECTED!`);
});

socket.on('disconnect', socket => {
    console.error(`DISCONNECTED FROM SERVER`);
});