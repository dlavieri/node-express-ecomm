const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-udemy',
    password: 'lavierinode'
});

module.exports = pool.promise();