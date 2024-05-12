const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { Server } = require('socket.io');

const io = new Server(http);

app.use(express.static('public')); // Serve static files from the 'public' folder

const messages = []; // Array to store chat messages

io.on('connection', (socket) => {
  console.log('User connected');

  // Send existing messages to new client
  socket.emit('load messages', messages);

  socket.on('chat message', (msg) => {
    console.log('message:', msg);
    messages.push(msg);
    io.emit('chat message', msg); // Broadcast message to all clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

http.listen(3000, () => {
  console.log('Server listening on port 3000');
});
