import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../main'
import { toast } from 'react-toastify'
import axios from 'axios'
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = () => {
    const navigate = useNavigate()
    const [show, setShow] = React.useState(false)
    const { isAuthenticated, setIsAuthenticated } = useContext(Context)

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:5000/api/v1/user/patient/logout",
                { withCredentials: true })
                .then((res) => {
                    toast.success("Logged out successfully")
                    setIsAuthenticated(false)
                })
        }
        catch (error) {
            toast.error("Error logging out: " + error.response.data.message)
        }
    }

    const handleLogin = async () => {
        navigate("/login")
    }

    return (
        <>
            <nav className={"container"}>
                <div className={"logo"}>
                    <img src="/logo.png" alt="logo" className="logo-img" />
                </div>


                <div className={show ? "navLinks showmenu" : "navLinks"}>
                    <div className='links'>
                        <Link
                            onClick={() => setShow(!show)}
                            to="/">HOME
                        </Link>
                        <Link

                            onClick={() => setShow(!show)}
                            to="/appointments">APPOINTMENTS</Link>
                        <Link
                            onClick={() => setShow(!show)}
                            to="/about">ABOUT</Link>
                    </div>

                    {
                        isAuthenticated ?
                            <button
                                className="logoutBtn btn" onClick={handleLogout}>
                                LOGOUT</button>
                            : <button
                                className="loginBtn btn"
                                onClick={handleLogin}
                            >LOGIN</button>
                    }
                </div>

                <div className="hamburger" onClick={() => setShow(!show)}>
                    <GiHamburgerMenu />
                </div>

            </nav>


        </>


    )
}

export default Navbar