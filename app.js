require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const port = process.env.PORT; // port 3500;

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8080"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MONGOOSE DATABASE CONNECTIONS

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection to the database is succesfull. "))
  .catch((err) => console.log(err));

app.use("/api/posts", require("./routes/routes.js"));
app.use("/api/users", require("./routes/userRoutes.js"));

//Starting Server
app.listen(port, () => {
  console.log("The server has started at port ", port);
});
