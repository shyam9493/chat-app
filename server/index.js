
const UserRouter = require('./Routes/UserRoute');

// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Chat');

// Define a message schema
const messageSchema = new mongoose.Schema({
    username: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});

// Create a message model
const Message = mongoose.model('Message', messageSchema);

// Load previous messages
async function loadMessages() {
    return await Message.find().sort({ timestamp: 1 });
}

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('New client connected');

    // Load previous messages and send to the new client
    loadMessages().then((messages) => {
        socket.emit('loadMessages', messages);
    });

    // Listen for incoming messages
    socket.on('sendMessage', async (messageData) => {
        const newMessage = new Message(messageData); // Create a new message document
        await newMessage.save(); // Save to the database
        console.log(newMessage);
        io.emit('newMessage', messageData); // Broadcast new message to all clients
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


app.use('/api',UserRouter);