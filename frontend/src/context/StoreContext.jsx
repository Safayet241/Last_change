 import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});


    // ================================
    // Get Food From Backend
    // ================================

    const fetchFoodList = async () => {

        try {

            const response = await fetch(
                "https://last-change-backend.onrender.com/api/food/list"
            );

            const result = await response.json();

            if (result.success) {

                setFoodList(result.data);

            } else {

                console.log(
                    "Food API Error:",
                    result.message
                );

            }

        } catch (error) {

            console.log(
                "Error fetching food:",
                error
            );

        }

    };


    useEffect(() => {

        fetchFoodList();

    }, []);


    // ================================
    // Add To Cart
    // ================================

    const addToCart = (itemId) => {

        if (!cartItems[itemId]) {

            setCartItems((prev) => ({
                ...prev,
                [itemId]: 1
            }));

        } else {

            setCartItems((prev) => ({
                ...prev,
                [itemId]: prev[itemId] + 1
            }));

        }

    };


    // ================================
    // Remove From Cart
    // ================================

    const removeFromCart = (itemId) => {

        setCartItems((prev) => {

            const updatedCart = {
                ...prev
            };

            if (updatedCart[itemId] > 1) {

                updatedCart[itemId] =
                    updatedCart[itemId] - 1;

            } else {

                delete updatedCart[itemId];

            }

            return updatedCart;

        });

    };


    // ================================
    // Total Cart Amount
    // ================================

    const getTotalCartAmount = () => {

        let totalAmount = 0;

        for (const item in cartItems) {

            if (cartItems[item] > 0) {

                const itemInfo = food_list.find(
                    (product) =>
                        product._id === item
                );

                if (itemInfo) {

                    totalAmount +=
                        itemInfo.price *
                        cartItems[item];

                }

            }

        }

        return totalAmount;

    };


    // ================================
    // Context Value
    // ================================

    const contextValue = {

        food_list,

        cartItems,

        setCartItems,

        addToCart,

        removeFromCart,

        getTotalCartAmount

    };


    return (

        <StoreContext.Provider
            value={contextValue}
        >

            {props.children}

        </StoreContext.Provider>

    );

};

export default StoreContextProvider;
