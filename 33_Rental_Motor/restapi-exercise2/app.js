const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const usersRoute = require("./routes/users");
const motorsRoute = require("./routes/motors");

app.use("/users", usersRoute);
app.use("/motors", motorsRoute);

//ROUTES
app.get("/", (req, res) => {
  res.send("API RUNNING");
});

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connect to db!")
);

app.listen(3000);
