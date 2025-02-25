import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';



const App = () => {
  return <div>  
    <Router>
  <Routes>
  <Route path="/dashboard" exact element={<Home/>}/>
  <Route path="/login"  element={<Login/>}/>
  <Route path="/signup"  element={<SignUp/>}/>
  </Routes>
  </Router> 
  </div>
  
}

export default App