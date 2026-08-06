const pool = require("../config/db");

async function create(user) {

    const test = await pool.query(`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_name = 'public.users'
`);

console.log(test.rows);

    const result = await pool.query(
        `
        INSERT INTO public.users
        (
            email,
            password,
            full_name
        )
        VALUES
        (
            $1,
            $2,
            $3
        )
        RETURNING
            id,
            email,
            full_name,
            created_at,
            updated_at;
        `,
        [
            user.email,
            user.password,
            user.fullName
        ]
    );

    return result.rows[0];

}

async function findByEmail(email) {

    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    return result.rows[0];

}

module.exports = {
    create,
    findByEmail
};

module.exports = {
    create,
    findByEmail
};