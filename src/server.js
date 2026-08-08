const app = require("./app");
const redis = require("./config/redis");

const PORT = process.env.PORT || 3000;

(async () => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });

    try {
        await redis.connect();
        console.log("Connected to Redis");
    } catch (err) {
        console.error("Error connecting to Redis:", err);
    }
})();