const { Pool } = require("pg");

const pool = new Pool({
    host: "nodejs-postgres.clm0k8acsm05.ap-southeast-2.rds.amazonaws.com",
    port: 5432,
    user: "postgres",
    password: "Hoangth89",
    database: "nodejs_demo",
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;
