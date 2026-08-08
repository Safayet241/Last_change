 
import orderModel from "../models/orderModel.js";


// ================= PLACE ORDER =================

const placeOrder = async (req, res) => {

    try {

        const newOrder = new orderModel({

            userId: req.body.userId || "guest",

            items: req.body.items,

            amount: req.body.amount,

            address: req.body.address,

            paymentMethod:
                req.body.paymentMethod ||
                "Cash on Delivery"

        });


        await newOrder.save();


        res.json({

            success: true,

            message: "Order Placed Successfully",

            orderId: newOrder._id

        });


    } catch (error) {

        console.log(error);


        res.json({

            success: false,

            message: "Error placing order",

            error: error.message

        });

    }

};



// ================= GET ALL ORDERS =================

const listOrders = async (req, res) => {

    try {

        const orders = await orderModel

            .find({})

            .sort({ createdAt: -1 });


        res.json({

            success: true,

            data: orders

        });


    } catch (error) {

        console.log(error);


        res.json({

            success: false,

            message: "Error fetching orders"

        });

    }

};



// ================= UPDATE ORDER STATUS =================

const updateStatus = async (req, res) => {

    try {

        const {
            orderId,
            status
        } = req.body;


        if (!orderId || !status) {

            return res.json({

                success: false,

                message: "Order ID and status are required"

            });

        }


        const updatedOrder =
            await orderModel.findByIdAndUpdate(

                orderId,

                {
                    status: status
                },

                {
                    new: true
                }

            );


        if (!updatedOrder) {

            return res.json({

                success: false,

                message: "Order not found"

            });

        }


        res.json({

            success: true,

            message: "Order Status Updated",

            data: updatedOrder

        });


    } catch (error) {

        console.log(error);


        res.json({

            success: false,

            message: "Error updating order status",

            error: error.message

        });

    }

};



export {
    placeOrder,
    listOrders,
    updateStatus
};
 

 
