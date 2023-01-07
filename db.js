const Pool = require("pg").Pool;

// database connection with server
const pool = new Pool({
    user: "postgres",
    password: "musasamu12341234",
    host: "localhost",
    port: 5432,
    database: "ftracker"
});

module.exports = pool;