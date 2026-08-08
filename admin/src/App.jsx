import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "./AdminLogin/AdminLogin";
import AdminPanel from "./AdminPanel/AdminPanel";
import AdminRoute from "./AdminRoute/AdminRoute";

import AddFood from "./Admin/AddFood";
import FoodDelete from "./Admin/FoodDelete";
import Orders from "./Admin/Orders";

function App() {
    return (
        <Routes>

            {/* Default */}
            <Route
                path="/"
                element={<Navigate to="/admin-login" replace />}
            />

            {/* Admin Login */}
            <Route
                path="/admin-login"
                element={<AdminLogin />}
            />

            {/* Admin Panel */}
            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminPanel />
                    </AdminRoute>
                }
            />

            {/* Add Food */}
            <Route
                path="/admin/add-food"
                element={
                    <AdminRoute>
                        <AddFood />
                    </AdminRoute>
                }
            />

            {/* Delete Food */}
            <Route
                path="/admin/food-delete"
                element={
                    <AdminRoute>
                        <FoodDelete />
                    </AdminRoute>
                }
            />

            {/* Orders */}
            <Route
                path="/admin/orders"
                element={
                    <AdminRoute>
                        <Orders />
                    </AdminRoute>
                }
            />

        </Routes>
    );
}

export default App;