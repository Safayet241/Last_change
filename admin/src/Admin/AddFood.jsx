 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddFood.css";

const AddFood = () => {

    const navigate = useNavigate();

    const [image, setImage] = useState(false);

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: ""
    });


    const onChangeHandler = (event) => {

        const name = event.target.name;
        const value = event.target.value;

        setData((data) => ({
            ...data,
            [name]: value
        }));

    };


    const onSubmitHandler = async (event) => {

        event.preventDefault();

        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("image", image);


        try {

            // Get admin login token
            const token = localStorage.getItem("token");


            if (!token) {

                alert("Please login as admin first");

                return;

            }


            const response = await fetch(
                "http://localhost:4000/api/food/add",
                {
                    method: "POST",

                    headers: {
                        Authorization: `Bearer ${token}`
                    },

                    body: formData
                }
            );


            const result = await response.json();


            if (result.success) {

                alert("Food Added Successfully!");


                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: ""
                });


                setImage(false);


            } else {

                alert(result.message);

            }


        } catch (error) {

            console.log(error);

            alert("Something went wrong");

        }

    };


    return (

        <div className="admin-add-food-page">

            {/* ================= BACK BUTTON ================= */}

            <button
                type="button"
                className="admin-back-button"
                onClick={() => navigate("/admin")}
            >
                ← Back to Admin Panel
            </button>


            {/* ================= ADD FOOD FORM ================= */}

            <form
                className="add-food"
                onSubmit={onSubmitHandler}
            >

                {/* Upload Image */}

                <div className="add-food-image">

                    <p>Upload Image</p>

                    <label htmlFor="image">

                        <img
                            src={
                                image
                                    ? URL.createObjectURL(image)
                                    : "/src/assets/admin_assets/upload_area.png"
                            }
                            alt="Upload"
                        />

                    </label>


                    <input
                        onChange={(e) =>
                            setImage(e.target.files[0])
                        }
                        type="file"
                        id="image"
                        hidden
                        required
                    />

                </div>


                {/* Food Name */}

                <div className="add-food-name">

                    <p>Food Name</p>

                    <input
                        onChange={onChangeHandler}
                        value={data.name}
                        type="text"
                        name="name"
                        placeholder="Enter food name"
                        required
                    />

                </div>


                {/* Food Description */}

                <div className="add-food-description">

                    <p>Food Description</p>

                    <textarea
                        onChange={onChangeHandler}
                        value={data.description}
                        name="description"
                        rows="6"
                        placeholder="Enter food description"
                        required
                    />

                </div>


                {/* Price & Category */}

                <div className="add-food-row">

                    {/* Price */}

                    <div className="add-food-price">

                        <p>Price</p>

                        <input
                            onChange={onChangeHandler}
                            value={data.price}
                            type="number"
                            name="price"
                            placeholder="250"
                            required
                        />

                    </div>


                    {/* Category */}

                    <div className="add-food-category">

                        <p>Category</p>

                        <select
                            onChange={onChangeHandler}
                            value={data.category}
                            name="category"
                            required
                        >

                            <option value="">
                                Select category
                            </option>


                            <option value="Jamalpur">
                                Jamalpur
                            </option>


                            <option value="Sylhet">
                                Sylhet
                            </option>


                            <option value="Dhaka">
                                Dhaka
                            </option>


                            <option value="Mymensingh">
                                Mymensingh
                            </option>


                            <option value="Sherpur">
                                Sherpur
                            </option>


                            <option value="Bogura">
                                Bogura
                            </option>


                            <option value="Rajshahi">
                                Rajshahi
                            </option>


                            <option value="Chadpur">
                                Chadpur
                            </option>

                        </select>

                    </div>

                </div>


                {/* Submit Button */}

                <button
                    type="submit"
                    className="add-food-button"
                >
                    ADD FOOD
                </button>


            </form>

        </div>

    );

};


export default AddFood;
 

