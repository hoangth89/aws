const app = require("./app");
const redis = require("./config/redis");

const PORT = process.env.PORT || 3000;

(async () => {
    await redis.connect();

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
})();