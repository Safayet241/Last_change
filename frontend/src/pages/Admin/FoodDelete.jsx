 
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FoodDelete.css";

const FoodDelete = () => {

    const navigate = useNavigate();

    const [foodList, setFoodList] = useState([]);


    const fetchFoodList = async () => {

        try {

            const response = await fetch(
                "http://localhost:4000/api/food/list"
            );

            const result = await response.json();

            if (result.success) {
                setFoodList(result.data);
            }

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {
        fetchFoodList();
    }, []);


    const deleteFood = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this food?"
        );

        if (!confirmDelete) return;


        try {

            const token = localStorage.getItem("token");


            if (!token) {

                alert("Please login as admin first");

                return;

            }


            const response = await fetch(
                "http://localhost:4000/api/food/remove",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        id: id
                    })
                }
            );


            const result = await response.json();


            if (result.success) {

                alert("Food deleted successfully");


                setFoodList((prev) =>
                    prev.filter((item) => item._id !== id)
                );


            } else {

                alert(result.message);

            }


        } catch (error) {

            console.log(error);

            alert("Something went wrong");

        }

    };


    return (

        <div className="food-delete">

            {/* Back to Admin Panel */}

            <button
                type="button"
                className="admin-back-button"
                onClick={() => navigate("/admin")}
            >
                ← Back to Admin Panel
            </button>


            <h2>Food List</h2>


            <div className="food-delete-list">

                {foodList.map((item) => (

                    <div
                        className="food-delete-item"
                        key={item._id}
                    >

                        <img
                            src={`http://localhost:4000/images/${item.image}`}
                            alt={item.name}
                        />


                        <div className="food-delete-info">

                            <h3>{item.name}</h3>

                            <p>{item.description}</p>

                            <span>
                                ৳{item.price}
                            </span>

                            <small>
                                {item.category}
                            </small>

                        </div>


                        <button
                            onClick={() =>
                                deleteFood(item._id)
                            }
                        >
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

};


export default FoodDelete;
 
