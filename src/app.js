require("dotenv").config();

const initDatabase = require("../database/init");

const express = require("express");

const usersRoutes = require("./routes/users.routes");
const productsRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());

const errorHandler =
    require("./middlewares/error.middleware");

app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/auth", authRoutes);
app.use("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

setTimeout(async () => {
    try {
        await initDatabase();
        console.log("Database initialized");

    } catch (err) {
        console.error("Error initializing database:", err);
    }
}, 60000);

app.use(errorHandler);

module.exports = app;