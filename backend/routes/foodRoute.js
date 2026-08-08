 
import express from "express";

import {
    addFood,
    listFood,
    removeFood
} from "../controllers/foodController.js";

import multer from "multer";
import adminAuth from "../middleware/adminAuth.js";


const foodRouter = express.Router();


// ================= IMAGE STORAGE =================

const storage = multer.diskStorage({

    destination: "uploads",

    filename: (req, file, cb) => {

        return cb(
            null,
            `${Date.now()}${file.originalname}`
        );

    }

});


const upload = multer({
    storage: storage
});


// ================= FOOD ROUTES =================


// Get all food
// Everyone can see food
foodRouter.get(
    "/list",
    listFood
);


// Add food
// ONLY ADMIN
foodRouter.post(
    "/add",
    adminAuth,
    upload.single("image"),
    addFood
);


// Delete food
// ONLY ADMIN
foodRouter.post(
    "/remove",
    adminAuth,
    removeFood
);


export default foodRouter;
