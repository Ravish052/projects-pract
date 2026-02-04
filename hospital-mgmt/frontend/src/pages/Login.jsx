import React, { useContext, useState } from 'react'
import { Context } from '../main'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'


const Login = () => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(Context)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
        confirmPassword
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setIsAuthenticated(true)
      setUser(response.data.user)
      toast.success("Login successful: " + response.data.message)
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      navigate('/')
    
    } catch (error) {
      toast.error(error.response.data.message)
  }
}

if (isAuthenticated) {
  navigate('/')
  return
}


return (
  <>
    <div className="container form-component login-form">
      <h2>Sign in</h2>
      <p>Please Login to continue</p>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus aspernatur minima vel libero, sed quam provident excepturi quasi a nobis ex, deserunt in ducimus enim at? Totam voluptates nesciunt maiores.</p>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button type="submit">login</button>
      </form>

      <div style={{ gap: 10, justifyContent: "flex-end", flexDirection: 'row' }}>
        <p>Don't have an account?</p>
        <Link to="/register" style={{ color: 'blue', textDecoration: 'underline' }}>Register</Link>
      </div>
    </div>
  </>
)
}

export default Login