 
import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'

import LoginPopup from './components/LoginPopup/LoginPopup'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import AdminLogin from './pages/AdminLogin/AdminLogin'
import AdminPanel from './pages/AdminPanel/AdminPanel'
import AdminRoute from './components/AdminRoute/AdminRoute'

import AddFood from './pages/Admin/AddFood'
import FoodDelete from './pages/Admin/FoodDelete'
import Orders from './pages/Admin/Orders'


function App() {

    const [showLogin, setShowLogin] = useState(false)


    return (
        <>

            {/* Login Popup */}

            {showLogin && (
                <LoginPopup
                    setShowLogin={setShowLogin}
                />
            )}


            {/* Navbar */}

            <Navbar
                setShowLogin={setShowLogin}
            />


            <Routes>

                {/* ================= USER ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />


                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/order"
                    element={
                        <ProtectedRoute>
                            <PlaceOrder />
                        </ProtectedRoute>
                    }
                />


                {/* ================= ADMIN LOGIN ================= */}

                <Route
                    path="/admin-login"
                    element={<AdminLogin />}
                />


                {/* ================= ADMIN PANEL ================= */}

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminPanel />
                        </AdminRoute>
                    }
                />


                {/* ================= ADMIN PAGES ================= */}

                <Route
                    path="/admin/add-food"
                    element={
                        <AdminRoute>
                            <AddFood />
                        </AdminRoute>
                    }
                />


                <Route
                    path="/admin/food-delete"
                    element={
                        <AdminRoute>
                            <FoodDelete />
                        </AdminRoute>
                    }
                />


                <Route
                    path="/admin/orders"
                    element={
                        <AdminRoute>
                            <Orders />
                        </AdminRoute>
                    }
                />

            </Routes>


            <Footer />

        </>
    )
}


export default App
 




