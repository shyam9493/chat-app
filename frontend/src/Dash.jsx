import MainPage from "./MainPage";
import Nav from "./Nav";
import { useLocation, useNavigate } from 'react-router-dom';

export default function Dash() {
    const location = useLocation();
    const navigate = useNavigate();
    const username = location.state?.username;


    if (!username) {
        navigate('/login'); 
        return null; 
    }else{
        navigate('/');
    }

    return (
        <>
            <Nav />
            <MainPage username={username} /> 
        </>
    );
}
