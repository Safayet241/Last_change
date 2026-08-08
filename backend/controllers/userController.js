
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ================= REGISTER =================

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;


        // Check existing user
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {

            return res.json({
                success: false,
                message: "User already exists"
            });

        }


        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // Create user
        const user = new userModel({
            name,
            email,
            password: hashedPassword,

            // New users are normal users
            role: "user"
        });


        await user.save();


        // Create token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        res.json({

            success: true,

            message: "Registration successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });


    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Registration failed"
        });

    }

};



// ================= LOGIN =================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;


        // Find user
        const user = await userModel.findOne({ email });

        if (!user) {

            return res.json({
                success: false,
                message: "User not found"
            });

        }


        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!isMatch) {

            return res.json({
                success: false,
                message: "Invalid email or password"
            });

        }


        // Create token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        // Login response
        res.json({

            success: true,

            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });


    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: "Login failed"
        });

    }

};


export {
    registerUser,
    loginUser
};
 
