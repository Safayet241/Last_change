 
import express from "express";

import {
    placeOrder,
    listOrders,
    updateStatus
} from "../controllers/orderController.js";

import adminAuth from "../middleware/adminAuth.js";


const orderRouter = express.Router();


// ================= USER =================

// User can place order
orderRouter.post(
    "/place",
    placeOrder
);


// ================= ADMIN =================

// Admin can see all orders
orderRouter.get(
    "/list",
    adminAuth,
    listOrders
);


// Admin can update order status
orderRouter.post(
    "/status",
    adminAuth,
    updateStatus
);


export default orderRouter;
 

