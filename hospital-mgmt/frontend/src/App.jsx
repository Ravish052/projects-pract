import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Appointments from './pages/Appointments'
import AboutUs from './pages/AboutUs'
import Register from './pages/Register'
import Login from './pages/Login'
import { toast, ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import { useContext } from 'react'
import { Context } from './main'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
const { isAuthenticated, setIsAuthenticated, user, setUser} = useContext(Context)

useEffect (() => {
  const fetchUser = async() => {
    try{
      const response = await axios.get('', {
        withCredentials: true
      });

      setIsAuthenticated(true);
      setUser(response.data.user);
    }catch(error){
      toast.error('Failed to fetch user data');
      console.error('Error fetching user:', error);
      setIsAuthenticated(false);
      setUser(null);
    }
  }

  fetchUser();
}, [isAuthenticated])

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <ToastContainer position='top-center' />
      </Router>
    </>
  )
}

export default App