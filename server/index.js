const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const stripeRoute = require("./routes/stripe");
const userRoute = require("./routes/user");
const reviewRoute = require("./routes/review");
const orderRoute = require("./routes/order");
const reservationRoute = require("./routes/reservation");
const cors = require("cors");

//configs and connections
dotenv.config();
connectDB();
app.use(cors());
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});
app.use(express.json());
//routes

app.use("/api/auth", authRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/order", orderRoute);
app.use("/api/user", userRoute);
app.use("/api/review", reviewRoute);
app.use("/api/book", reservationRoute);

//driver
app.listen(process.env.PORT || 5000, () => {
  console.log("backend server is up on PORT " + process.env.PORT || 5000);
});
