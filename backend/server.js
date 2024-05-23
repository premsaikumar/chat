const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const Message = require('./models/Message');
const User = require('./models/User');
const WebSocket = require('ws')
const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({server})
const io = socketIo(server);
const PORT = 4000;

wss.on('connection',(ws) => {
   console.log('New Client connection')
   ws.send('Welcome client')
   
   ws.on('message',(msg) => {
      console.log('Recieved Message')
      ws.send(`Got your mmsg ${msg}`)

   })
})


mongoose.connect('mongodb://localhost:27017/chatApp', { 
   // useNewUrlParser: true, 
   // useUnifiedTopology: true 
})
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server only if the database connection is successful
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());
app.use('/auth', authRoutes);

// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.on('sendMessage', async (messageData) => {
//     const message = new Message(messageData);
//     await message.save();
//     io.emit('message', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });
