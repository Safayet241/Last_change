 
import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

    const token = localStorage.getItem("token");

    const userData =
        localStorage.getItem("user");

    const user = userData
        ? JSON.parse(userData)
        : null;


    if (!token) {
        return <Navigate to="/admin-login" replace />;
    }


    if (!user || user.role !== "admin") {
        return <Navigate to="/admin-login" replace />;
    }


    return children;
};

export default AdminRoute;
 
