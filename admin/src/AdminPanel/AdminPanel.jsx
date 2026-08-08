import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminPanel.css";

const AdminPanel = () => {

const navigate = useNavigate();


const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin-login");
};


return (

    <div className="admin-panel">

        <h1>FoodLink Admin Panel</h1>

        <div className="admin-panel-menu">

            <Link to="/admin/add-food">
                Add Food
            </Link>

            <Link to="/admin/food-delete">
                Delete Food
            </Link>

            <Link to="/admin/orders">
                Orders
            </Link>

            <button onClick={logout}>
                Logout
            </button>

        </div>

    </div>
);


};

export default AdminPanel;