const redisClient = require("../config/redis");

async function get(key) {
    try {
        if (!redisClient.isReady) {
            return null;
        }

        return await redisClient.get(key);
    } catch (err) {
        console.error(`Redis GET failed [${key}]:`, err);
        return null;
    }
}

async function set(key, value, options) {
    try {
        if (!redisClient.isReady) {
            return false;
        }

        await redisClient.set(key, value, options);
        return true;
    } catch (err) {
        console.error(`Redis SET failed [${key}]:`, err);
        return false;
    }
}

async function del(key) {
    try {
        if (!redisClient.isReady) {
            return false;
        }

        await redisClient.del(key);
        return true;
    } catch (err) {
        console.error(`Redis DEL failed [${key}]:`, err);
        return false;
    }
}

module.exports = {
    get,
    set,
    del,
};