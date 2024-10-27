const UserRouter = require('./Routes/UserRoute');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv=require("dotenv");
dotenv.config();



const API_KEY=process.env.API;
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// import UserRouter from './Routes/UserRoute.js'; // Add .js extension
// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import Gemini from "gemini-ai";


// const gemini = new Gemini(API_KEY);

// console.log(await gemini.ask("Hi!"));

// Create an Express application
const app = express();
const server = http.createServer(app);



app.get('/',async (req,res)=>{
    res.send("Backend Working......");
});
app.get('/say',async(req,res)=>{
    res.send("Its Works Priya");
})

// Middleware
app.use(cors({
    origin: ['https://chat-app-duo.vercel.app','http://localhost:5173'], // Allow this origin
    credentials: true // Allow credentials if needed
}));

// Set up Socket.IO with CORS
const io = new Server(server, {
    cors: {
        origin: ['https://chat-app-duo.vercel.app','http://localhost:5173'], // Allow this origin
        methods: ['GET', 'POST'],
        credentials: true // Allow credentials if needed
    }
});

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
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
        try{
        const ai=(messageData.message).split(' ')[0].toLowerCase();
        if(ai=="@duo-ai"){
            // console.log(ai);
            
            // const response=await gemini.ask((messageData.message).replace(ai,""));
            const result = await model.generateContent((messageData.message).replace(ai,""));
            messageData.message=result.response.text();
        }
        // messageData.message="ai generated one";
        const newMessage = new Message(messageData); // Create a new message document
        await newMessage.save(); // Save to the database
         // Broadcast new message to all clients
    }catch(err){
        messageData.message="error generating...."
    }
    io.emit('newMessage', messageData);
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
