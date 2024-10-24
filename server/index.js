const UserRouter = require('./Routes/UserRoute');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

// Create an Express application
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow this origin
    credentials: true // Allow credentials if needed
}));

// Set up Socket.IO with CORS
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Allow this origin
        methods: ['GET', 'POST'],
        credentials: true // Allow credentials if needed
    }
});

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Chat')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a message schema
const messageSchema = new mongoose.Schema({
    usernamefrom: String,
    usernameto: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});

// Create a message model
const Message = mongoose.model('Message', messageSchema);

// Load previous messages for specific users
async function loadMessages(username1, username2) {
    return await Message.find({
        $or: [
            { usernamefrom: username1, usernameto: username2 },
            { usernamefrom: username2, usernameto: username1 }
        ]
    }).sort({ timestamp: 1 });
}

io.on('connection', (socket) => {
    console.log('New client connected');

    // Listen for the joinChat event to load messages for the specific users
    socket.on('joinChat', async ({ username1, username2 }) => {
        const messages = await loadMessages(username1, username2);
        socket.emit('loadMessages', messages);
    });

    // Listen for incoming messages
    socket.on('sendMessage', async (messageData) => {
        const newMessage = new Message(messageData); // Create a new message document
        await newMessage.save(); // Save to the database
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

app.use('/api', UserRouter);
