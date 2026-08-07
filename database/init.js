const pool = require("../src/config/db");

async function initDatabase() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            full_name VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            role VARCHAR(20) DEFAULT 'user'
        );
    `);


    await pool.query(`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price NUMERIC(10,2) NOT NULL,
            image_url TEXT,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            created_by INTEGER,
            CONSTRAINT products_created_by_fkey
                FOREIGN KEY(created_by)
                REFERENCES users(id)
        );
    `);


    console.log("Database initialized");
}

module.exports = initDatabase;