 
import React from "react";
import { Link } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {

    return (

        <div className="admin-navbar">

            <h2>FoodLink Admin</h2>

            <div className="admin-navbar-links">

                <Link to="/admin">
                    Dashboard
                </Link>

                <Link to="/admin/add-food">
                    Add Food
                </Link>

                <Link to="/admin/food-delete">
                    Delete Food
                </Link>

                <Link to="/admin/orders">
                    Orders
                </Link>

                <Link to="/">
                    Back to Website
                </Link>

            </div>

        </div>

    );
};

export default AdminNavbar;
 
