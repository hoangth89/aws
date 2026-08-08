const { createClient } = require("redis");

let client = null;

if (process.env.REDIS_HOST && process.env.REDIS_PORT) {
    client = createClient({
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    });

    client.on("error", (err) => {
        console.error("Redis Error:", err);
    }
    );
} else {
    console.error("REDIS_HOST and REDIS_PORT environment variables are not set.");
}

module.exports = client;