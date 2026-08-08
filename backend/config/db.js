
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

// ... rest of your server.js code

import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://safayet24235241_db_user:H25TtdPVSQUcdIuC@cluster0.q4cgawv.mongodb.net/?appName=Cluster0');

        console.log("DB Connected");
    } catch (error) {
        console.log("DB Connection Error:", error);
    }
};