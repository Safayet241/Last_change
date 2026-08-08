 
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {

    try {

        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.json({
                success: false,
                message: "Not Authorized. Please Login."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        if (user.role !== "admin") {
            return res.json({
                success: false,
                message: "Admin access required"
            });
        }

        req.user = user;

        next();

    } catch (error) {

        console.log(error);

        return res.json({
            success: false,
            message: "Not Authorized"
        });
    }
};

export default adminAuth;
 