import { useEffect, useState } from 'react';
import axios from 'axios';
import ChatWindow from './Chat'; // Import the ChatWindow component

export default function MainPage({username}) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user
    const token = localStorage.getItem('token'); 
    const loggedInUser = localStorage.getItem('username'); // Get logged-in user data

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/getall'); 
                setUsers(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'An error occurred while fetching users');
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex">
            <div className="bg-gray-800 text-white w-64 h-screen p-5">
                <h1 className="text-2xl font-bold mb-6">All Users</h1>
                {error && <p className="text-red-500">{error}</p>}
                <ul>
                    {users.length > 0 ? (
                        users.map(user => (
                            <li key={user._id} className="mb-4">
                                <button
                                    onClick={() => setSelectedUser(user)} // Set the selected user on click
                                    className="hover:bg-gray-700 p-2 rounded block w-full text-left"
                                >
                                    {user.username}{username && user.username === username ? ' (YOU)' : ''}
                                </button>
                            </li>
                        ))
                    ) : (
                        <li>No users found.</li>
                    )}
                </ul>
            </div>

            {/* Conditionally render the chat interface */}
            {selectedUser && <ChatWindow user={selectedUser} userfrom={username} />}
        </div>
    );
}
