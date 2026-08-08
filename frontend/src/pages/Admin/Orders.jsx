 
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.css";

const Orders = () => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);


    // ================= FETCH ORDERS =================

    const fetchOrders = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {

                alert("Please login as admin first");

                navigate("/admin-login");

                return;

            }


            const response = await fetch(
                "http://localhost:4000/api/order/list",
                {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );


            const result = await response.json();


            if (result.success) {

                setOrders(result.data);

            } else {

                alert(result.message);

            }


        } catch (error) {

            console.log(
                "Error fetching orders:",
                error
            );

            alert("Something went wrong while fetching orders");

        } finally {

            setLoading(false);

        }

    };


    // ================= LOAD ORDERS =================

    useEffect(() => {

        fetchOrders();

    }, []);


    // ================= UPDATE ORDER STATUS =================

    const updateStatus = async (orderId, status) => {

        try {

            const token = localStorage.getItem("token");


            if (!token) {

                alert("Please login as admin first");

                navigate("/admin-login");

                return;

            }


            const response = await fetch(
                "http://localhost:4000/api/order/status",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        orderId,
                        status
                    })
                }
            );


            const result = await response.json();


            if (result.success) {

                setOrders((prevOrders) =>

                    prevOrders.map((order) =>

                        order._id === orderId

                            ? {
                                ...order,
                                status: status
                            }

                            : order

                    )

                );


                alert("Order status updated successfully");

            } else {

                alert(result.message);

            }


        } catch (error) {

            console.log(
                "Status update error:",
                error
            );

            alert("Something went wrong");

        }

    };


    // ================= LOADING =================

    if (loading) {

        return (

            <div className="orders">

                <button
                    type="button"
                    className="admin-back-button"
                    onClick={() => navigate("/admin")}
                >
                    ← Back to Admin Panel
                </button>

                <p>
                    Loading orders...
                </p>

            </div>

        );

    }


    // ================= UI =================

    return (

        <div className="orders">


            {/* ================= BACK BUTTON ================= */}

            <button
                type="button"
                className="admin-back-button"
                onClick={() => navigate("/admin")}
            >
                ← Back to Admin Panel
            </button>


            {/* ================= TITLE ================= */}

            <h2>
                All Orders
            </h2>


            {/* ================= NO ORDERS ================= */}

            {orders.length === 0 ? (

                <p className="no-orders">
                    No orders found
                </p>

            ) : (


                /* ================= ORDER LIST ================= */

                orders.map((order) => (

                    <div
                        className="order-card"
                        key={order._id}
                    >


                        {/* ================= ORDER ICON ================= */}

                        <div className="order-icon">
                            📦
                        </div>


                        {/* ================= ORDER DETAILS ================= */}

                        <div className="order-details">


                            <h3>
                                Order #
                                {order._id.slice(-6)}
                            </h3>


                            {/* Customer */}

                            <p>

                                <strong>
                                    Customer:
                                </strong>{" "}

                                {order.address?.firstName}{" "}

                                {order.address?.lastName}

                            </p>


                            {/* Phone */}

                            <p>

                                <strong>
                                    Phone:
                                </strong>{" "}

                                {order.address?.phone}

                            </p>


                            {/* Address */}

                            <p>

                                <strong>
                                    Address:
                                </strong>{" "}

                                {order.address?.street},{" "}

                                {order.address?.city},{" "}

                                {order.address?.state}

                            </p>


                            {/* ================= FOOD ITEMS ================= */}

                            <div className="order-foods">


                                {order.items?.map((item, index) => (

                                    <div
                                        className="order-food"
                                        key={item._id || index}
                                    >


                                        <img
                                            src={`http://localhost:4000/images/${item.image}`}
                                            alt={item.name}
                                        />


                                        <div>

                                            <p>
                                                {item.name}
                                            </p>


                                            <span>
                                                ৳{item.price} ×{" "}
                                                {item.quantity}
                                            </span>

                                        </div>


                                    </div>

                                ))}


                            </div>


                        </div>


                        {/* ================= RIGHT SIDE ================= */}

                        <div className="order-right">


                            <p>
                                <strong>
                                    Total:
                                </strong>
                            </p>


                            <h3>
                                ৳{order.amount}
                            </h3>


                            <p>
                                {order.paymentMethod}
                            </p>


                            {/* Order Status */}

                            <select
                                value={
                                    order.status ||
                                    "Food Processing"
                                }

                                onChange={(event) =>

                                    updateStatus(
                                        order._id,
                                        event.target.value
                                    )

                                }
                            >


                                <option value="Food Processing">
                                    Food Processing
                                </option>


                                <option value="Out for Delivery">
                                    Out for Delivery
                                </option>


                                <option value="Delivered">
                                    Delivered
                                </option>


                            </select>


                        </div>


                    </div>

                ))

            )}


        </div>

    );

};


export default Orders;
 



