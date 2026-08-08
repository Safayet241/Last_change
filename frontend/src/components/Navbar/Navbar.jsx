 
import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home")
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const { getTotalCartAmount } = useContext(StoreContext)


    // Check login status
    useEffect(() => {

        const token = localStorage.getItem("token")

        if (token) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }

    }, [])


    // Logout
    const handleLogout = () => {

        localStorage.removeItem("token")
        localStorage.removeItem("user")

        setIsLoggedIn(false)

        alert("Logged out successfully")

    }


    return (

        <div className="navbar">

            <Link to="/">
                <img
                    src={assets.logo}
                    alt="FoodLink"
                    className="logo"
                />
            </Link>


            <ul className="navbar-menu">

                <Link
                    to="/"
                    onClick={() => setMenu("home")}
                    className={menu === "home" ? "active" : ""}
                >
                    home
                </Link>


                <a
                    href="#explore-menu"
                    onClick={() => setMenu("menu")}
                    className={menu === "menu" ? "active" : ""}
                >
                    menu
                </a>


                <a
                    href="#app-download"
                    onClick={() => setMenu("mobile-app")}
                    className={menu === "mobile-app" ? "active" : ""}
                >
                    mobile-app
                </a>


                <a
                    href="#footer"
                    onClick={() => setMenu("contact-us")}
                    className={menu === "contact-us" ? "active" : ""}
                >
                    contact us
                </a>

            </ul>


            <div className="navbar-right">

                <img
                    src={assets.search_icon}
                    alt="Search"
                />


                <div className="navbar-search-icon">

                    <Link to="/cart">

                        <img
                            src={assets.basket_icon}
                            alt="Cart"
                        />

                    </Link>

                    <div
                        className={
                            getTotalCartAmount() === 0
                                ? ""
                                : "dot"
                        }
                    />

                </div>


                {isLoggedIn ? (

                    <button
                        type="button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                ) : (

                    <button
                        type="button"
                        onClick={() => setShowLogin(true)}
                    >
                        Sign In
                    </button>

                )}

            </div>

        </div>

    )
}

export default Navbar
 

 

