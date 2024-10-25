import './App.css'
import Dash from './Dash';
import Login from './Login'
import Signup from './Signup'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      
        <Route path='/dash' element={<Dash />} />
      </Routes>
    </Router>
    </>
  
  )
}

export default App
