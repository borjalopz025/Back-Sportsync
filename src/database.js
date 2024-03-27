const mysql = require("mysql2");

const pool = mysql.createConnection({
    host:      process.env.DB_HOST        || "sportsync.cpirdo7txrb3.eu-west-3.rds.amazonaws.com",
    user:      process.env.DB_USER        || "admin",
    password:  process.env.DB_PASSWORD    || "Sportsync1234",
    database:  process.env.DB_DATABASE    || "SportSync",
    port:      process.env.DB_PORT        || 3306
    
}).promise();

console.log("Conexión con la BBDD creada");

module.exports = { pool };