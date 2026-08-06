const pool = require("../config/db");

async function getUsers() {
    const result = await pool.query(
        "SELECT * FROM users ORDER BY id"
    );

    return result.rows;
}

async function createUser(name) {
    const result = await pool.query(
        "INSERT INTO users(name) VALUES($1) RETURNING *",
        [name]
    );

    return result.rows[0];
}

module.exports = {
    getUsers,
    createUser
};