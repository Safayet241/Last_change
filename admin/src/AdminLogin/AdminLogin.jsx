
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:4000/api/user/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const result = await response.json();

            if (!result.success) {
                alert(result.message);
                return;
            }


            if (result.user?.role !== "admin") {

                alert("You are not authorized as admin.");

                return;
            }


            localStorage.setItem(
                "token",
                result.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(result.user)
            );


            alert("Admin Login Successful");

            navigate("/admin");

        } catch (error) {

            console.log(error);

            alert("Something went wrong");

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="admin-login">

            <form
                className="admin-login-container"
                onSubmit={handleSubmit}
            >

                <h2>FoodLink Admin</h2>

                <p>Admin Login</p>


                <input
                    type="email"
                    placeholder="Admin email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />


                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "LOGIN..."
                        : "ADMIN LOGIN"
                    }
                </button>

            </form>

        </div>
    );
};

export default AdminLogin;

