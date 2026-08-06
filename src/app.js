require("dotenv").config();

const express = require("express");

const usersRoutes = require("./routes/users.routes");
const productsRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/auth", authRoutes);

const errorHandler =
    require("./middlewares/error.middleware");

app.use(errorHandler);

module.exports = app;