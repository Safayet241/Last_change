import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const [food_list, setFoodList] = useState([]);
    const [cartItems, setCartItems] = useState({});

    // Get food from backend
    const fetchFoodList = async () => {
        try {
            const response = await fetch(
                "https://project-backend-jd70.onrender.com"
            );

            const result = await response.json();

            if (result.success) {
                setFoodList(result.data);
            } else {
                console.log(result.message);
            }

        } catch (error) {
            console.log("Error fetching food:", error);
        }
    };

    useEffect(() => {
        fetchFoodList();
    }, []);


    // Add to cart
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


    // Remove from cart
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }));
    };


    // Total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {

                const itemInfo = food_list.find(
                    (product) => product._id === item
                );

                if (itemInfo) {
                    totalAmount +=
                        itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    };


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
