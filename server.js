import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { razorpay } from "./config/razorpay.js";

dotenv.config();
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Food Schema
const FoodPost = mongoose.model("FoodPost", {
    hostel: String,
    foodType: String,
    quantity: Number,
    location: String,
    image: String,
    pickupTime: String
});

// Host Dashboard
app.get("/dashboard", async (req, res) => {
    const posts = await FoodPost.find();
    res.render("dashboard", { posts });
});

// Create Food Post
app.post("/upload", async (req, res) => {
    await FoodPost.create(req.body);
    res.json({ success: true });
});

// Razorpay Payment API
app.post("/donate", async (req, res) => {
    const options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: "donation_receipt"
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
