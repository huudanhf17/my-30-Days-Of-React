const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv/config");

//Middlewares
app.use(cors({ credentials: true, origin: "https://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

//Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const usersRoute = require("./routes/users");
const motorsRoute = require("./routes/motors");
const ordersRoute = require("./routes/orders");
const transactionsRoute = require("./routes/transactions");

app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.use("/users", usersRoute);
app.use("/motors", motorsRoute);
app.use("/orders", ordersRoute);
app.use("/transactions", transactionsRoute);

//ROUTES
app.get("/testc", (req, res) => {
  res
    .status(202)
    .cookie("Name222", "Rahul Ahire", {
      sameSite: "strict",
      path: "/",
      expires: new Date(new Date().getTime() + 100 * 1000),
      httpOnly: true,
      secure: true,
    })
    .send("cookie being initialised");
});

app.get("/api/health", (req, res) => {
  res.send("API RUNNING");
});

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connect to MongoDB!")
);

app.listen(5000);
