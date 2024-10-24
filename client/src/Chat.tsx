// ChatWindow.js
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

export default function ChatWindow({ user }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Load previous messages when the component mounts
        socket.on('loadMessages', (loadedMessages) => {
            setMessages(loadedMessages);
        });

        // Listen for new messages
        socket.on('newMessage', (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // Cleanup on unmount
        return () => {
            socket.off('loadMessages');
            socket.off('newMessage');
        };
    }, []);

    const handleSendMessage = () => {
        if (message.trim()) {
            const messageData = {
                username: user.username,
                message: message,
            };
            socket.emit('sendMessage', messageData); // Send the message to the server
            // setMessage(''); // Clear the input after sending
        }
    };

    return (
        <div className="bg-white text-black w-[80vw] h-[80vh] p-5 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-xl font-bold mb-4">Chat with {user.username}</h2>
            <div className="flex-1 border h-full overflow-auto p-2 mb-2">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">
                        <strong>{msg.username}: </strong>{msg.message}
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                <button className="p-2 rounded-full text-gray-500 hover:text-gray-700">
                    <img src="chat.png" className="mx-auto h-10 w-auto" alt="Emoji" />
                </button>
                <div className="flex-1">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="border rounded p-2 mt-2 w-full"
                    />
                </div>
                <button
                    onClick={handleSendMessage}
                    className="bg-blue-500 text-white rounded px-4 py-2 ml-2"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
