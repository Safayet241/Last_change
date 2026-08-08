 
import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'

const LoginPopup = ({ setShowLogin }) => {

    const [currState, setCurrState] = useState("Login")

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })


    const onChangeHandler = (event) => {

        const { name, value } = event.target

        setData(prev => ({
            ...prev,
            [name]: value
        }))

    }


    const onSubmitHandler = async (event) => {

        event.preventDefault()

        try {

            const endpoint =
                currState === "Login"
                    ? "login"
                    : "register"


            const response = await fetch(
                `http://localhost:4000/api/user/${endpoint}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(data)
                }
            )


            const result = await response.json()

            console.log("API RESULT:", result)


            if (result.success) {

                alert(
                    currState === "Login"
                        ? "Login Successful"
                        : "Registration Successful"
                )


                if (result.token) {

                    localStorage.setItem(
                        "token",
                        result.token
                    )

                }


                if (result.user) {

                    localStorage.setItem(
                        "user",
                        JSON.stringify(result.user)
                    )

                }


                setShowLogin(false)

            } else {

                alert(result.message)

            }

        } catch (error) {

            console.log("AUTH ERROR:", error)

            alert("Something went wrong")

        }

    }


    return (

        <div className="login-popup">

            <form
                className="login-popup-container"
                onSubmit={onSubmitHandler}
            >


                {/* Title */}

                <div className="login-popup-title">

                    <h2>{currState}</h2>

                    <img
                        src={assets.cross_icon}
                        alt="Close"
                        onClick={() => setShowLogin(false)}
                    />

                </div>


                {/* Inputs */}

                <div className="login-popup-inputs">

                    {currState === "Sign Up" && (

                        <input
                            name="name"
                            type="text"
                            placeholder="Your name"
                            value={data.name}
                            onChange={onChangeHandler}
                            required
                        />

                    )}


                    <input
                        name="email"
                        type="email"
                        placeholder="Your email"
                        value={data.email}
                        onChange={onChangeHandler}
                        required
                    />


                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={onChangeHandler}
                        required
                    />

                </div>


                {/* Submit Button */}

                <button
                    type="submit"
                    className="auth-submit-button"
                >
                    {currState === "Login"
                        ? "Login"
                        : "Create Account"
                    }
                </button>


                {/* Terms */}

                <div className="login-popup-condition">

                    <input
                        type="checkbox"
                        required
                    />

                    <p>
                        By continuing, I agree to the terms of use
                        & privacy policy.
                    </p>

                </div>


                {/* Switch */}

                {currState === "Login" ? (

                    <p className="login-switch">

                        Create a new account?

                        <button
                            type="button"
                            className="switch-button"
                            onClick={() => setCurrState("Sign Up")}
                        >
                            Sign Up
                        </button>

                    </p>

                ) : (

                    <p className="login-switch">

                        Already have an account?

                        <button
                            type="button"
                            className="switch-button"
                            onClick={() => setCurrState("Login")}
                        >
                            Login
                        </button>

                    </p>

                )}

            </form>

        </div>

    )
}

export default LoginPopup
 

 



