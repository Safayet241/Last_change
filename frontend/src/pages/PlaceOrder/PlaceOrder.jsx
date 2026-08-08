
import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {

    const {
        cartItems,
        food_list,
        getTotalCartAmount,
        setCartItems
    } = useContext(StoreContext);


    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "Bangladesh"
    });


    const [paymentMethod, setPaymentMethod] = useState(
        "Cash on Delivery"
    );


    const [transactionId, setTransactionId] = useState("");


    const [loading, setLoading] = useState(false);


    const onChangeHandler = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setData(prev => ({
            ...prev,
            [name]: value
        }));

    };


    const placeOrder = async (event) => {

        event.preventDefault();


        if (getTotalCartAmount() === 0) {

            alert("Your cart is empty");
            return;

        }


        // Rocket হলে Transaction ID অবশ্যই দিতে হবে

        if (
            paymentMethod === "Rocket" &&
            !transactionId.trim()
        ) {

            alert("Please enter your Rocket Transaction ID");
            return;

        }


        setLoading(true);


        try {

            // Convert cart into order items

            const orderItems = food_list
                .filter(item => cartItems[item._id] > 0)
                .map(item => ({

                    foodId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: cartItems[item._id],
                    image: item.image

                }));


            // Order data

            const orderData = {

                userId: "guest",

                items: orderItems,

                amount: getTotalCartAmount() + 12,

                address: data,

                paymentMethod: paymentMethod,

                transactionId:
                    paymentMethod === "Rocket"
                        ? transactionId.trim()
                        : ""

            };


            const response = await fetch(
                "http://localhost:4000/api/order/place",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(orderData)

                }
            );


            const result = await response.json();


            if (result.success) {

                alert("Order Placed Successfully!");

                // Clear cart

                setCartItems({});

                // Clear transaction ID

                setTransactionId("");


            } else {

                alert(result.message);

            }


        } catch (error) {

            console.log("Order error:", error);

            alert(
                "Something went wrong while placing order"
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <form
            className="place-order"
            onSubmit={placeOrder}
        >

            {/* ================= DELIVERY INFORMATION ================= */}

            <div className="place-order-left">

                <p className="title">
                    Delivery Information
                </p>


                <div className="multi-fields">

                    <input
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        type="text"
                        placeholder="First name"
                        required
                    />


                    <input
                        name="lastName"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        type="text"
                        placeholder="Last name"
                        required
                    />

                </div>


                <input
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder="Email address"
                    required
                />


                <input
                    name="street"
                    onChange={onChangeHandler}
                    value={data.street}
                    type="text"
                    placeholder="Street"
                    required
                />


                <div className="multi-fields">

                    <input
                        name="city"
                        onChange={onChangeHandler}
                        value={data.city}
                        type="text"
                        placeholder="City"
                        required
                    />


                    <input
                        name="state"
                        onChange={onChangeHandler}
                        value={data.state}
                        type="text"
                        placeholder="State"
                        required
                    />

                </div>


                <div className="multi-fields">

                    <input
                        name="zipCode"
                        onChange={onChangeHandler}
                        value={data.zipCode}
                        type="text"
                        placeholder="Zip code"
                        required
                    />


                    <input
                        name="country"
                        onChange={onChangeHandler}
                        value={data.country}
                        type="text"
                        placeholder="Country"
                        required
                    />

                </div>


                <input
                    name="phone"
                    onChange={onChangeHandler}
                    value={data.phone}
                    type="tel"
                    placeholder="Phone number"
                    required
                />

            </div>


            {/* ================= ORDER SUMMARY ================= */}

            <div className="place-order-right">

                <div className="cart-total">

                    <h2>
                        Cart Totals
                    </h2>


                    <div>

                        <div className="cart-total-details">

                            <p>
                                Subtotal
                            </p>

                            <p>
                                ৳{getTotalCartAmount()}
                            </p>

                        </div>


                        <hr />


                        <div className="cart-total-details">

                            <p>
                                Delivery Fee
                            </p>

                            <p>
                                ৳12
                            </p>

                        </div>


                        <hr />


                        <div className="cart-total-details">

                            <p>
                                Total
                            </p>

                            <p>
                                ৳{getTotalCartAmount() + 12}
                            </p>

                        </div>

                    </div>


                    {/* ================= PAYMENT METHOD ================= */}

                    <div className="payment-method">

                        <h3>
                            Payment Method
                        </h3>


                        <label>

                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Cash on Delivery"
                                checked={
                                    paymentMethod ===
                                    "Cash on Delivery"
                                }
                                onChange={(event) => {

                                    setPaymentMethod(
                                        event.target.value
                                    );

                                    setTransactionId("");

                                }}
                            />

                            Cash on Delivery

                        </label>


                        <label>

                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Rocket"
                                checked={
                                    paymentMethod === "Rocket"
                                }
                                onChange={(event) =>
                                    setPaymentMethod(
                                        event.target.value
                                    )
                                }
                            />

                            Rocket

                        </label>

                    </div>


                    {/* ================= ROCKET PAYMENT ================= */}
                    {paymentMethod === "Rocket" && (
                        <div className="rocket-payment">
                            <p>Rocket:017372544149</p>

                            <p>
                                Send ৳{getTotalCartAmount() + 12} to Rocket:
                            </p>

                            <h3>
                                {import.meta.env.VITE_ROCKET_NUMBER}
                            </h3>

                            <p>
                                After payment, enter your Transaction ID.
                            </p>

                            <input
                                type="text"
                                placeholder="Rocket Transaction ID"
                                value={transactionId}
                                onChange={(event) =>
                                    setTransactionId(event.target.value)
                                }
                                required
                            />

                        </div>
                    )}


                    {/* ================= PLACE ORDER ================= */}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "PLACING ORDER..."
                            : "PLACE ORDER"
                        }

                    </button>

                </div>

            </div>

        </form>

    );

};

export default PlaceOrder;

