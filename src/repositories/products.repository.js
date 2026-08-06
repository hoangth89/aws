const pool = require("../config/db");

async function create(product) {

    const { name, price, imageUrl, created_by } = product;

    const result = await pool.query(
        `
        INSERT INTO products
        (
            name,
            price,
            image_url,
            created_by
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4
        )
        RETURNING *;
        `,
        [
            name,
            price,
            imageUrl,
            created_by
        ]
    );

    return result.rows[0];
}

async function findAll() {

    const result = await pool.query(
        `
        SELECT
            id,
            name,
            price,
            image_url,
            created_at,
            updated_at
        FROM products
        ORDER BY id;
        `
    );

    return result.rows;
}

module.exports = {
    findAll,
    create
};