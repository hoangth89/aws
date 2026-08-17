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

const instanceRandomId = Math.floor(Math.random() * 1000000);
app.get("/instanceId", (req, res) => {
    res.json({ instanceId: instanceRandomId });
}); 

app.get('/app-info', (req, res) => {
    const appInfo = {
        name: 'AWS Node.js App',
        version: '1.0.0',
        description: 'A Node.js application running on AWS',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    }

   res.set('cache-control', 'public, max-age=3600'); // Cache for 1 hour
   return res.status(200).json(appInfo);
});

app.get('/cached-random-number', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const timeStamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    res.set('cache-control', 'public, max-age=360'); // Cache for 6 minutes
    res.json({ 
        timeStamp,
        randomNumber 
    });
}); 

app.get('/fresh-random-number', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const timeStamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    res.set('cache-control', 'no-store'); // no-cache
    res.json({ 
        timeStamp, 
        randomNumber 
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/cpu', async (req, res) => {
  const duration = Math.min(Number(req.query.seconds) || 10, 30, 600);

  const end = Date.now() + duration * 1000;

  while (Date.now() < end) {
    Math.sqrt(Math.random() * 1000000);
  }

  res.json({
    message: 'CPU load test completed',
    duration: `${duration}s`,
    timestamp: new Date().toISOString()
  });
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