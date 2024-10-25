import { useNavigate } from 'react-router-dom'; // Assuming you use react-router for navigation

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        alert("You have logged out!");
        navigate('/');
    };

    return (
        <button onClick={handleLogout} className="bg-red-500 text-white rounded px-4 py-2">
            Logout
        </button>
    );
}

export default LogoutButton;
