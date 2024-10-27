import MainPage from "./MainPage";
import Nav from "./Nav";
import { useLocation, useNavigate } from 'react-router-dom';

export default function Dash() {
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state?.username;


    if (!username) {
        navigate('/'); 
        return null; 
    }

    return (
        <>
            <Nav />
            <MainPage username={username} /> 
        </>
    );
}
