const dotenv = require('dotenv');
const mysql = require('mysql2');

// configr  aration with env. 
dotenv.config();
module.exports = mysql.createConnection({
host: process.env.MYSQL_HOST,
user: process.env.MYSQL_USER,
password: process.env.MYSQL_PASS, 
database: process.env.MYSQL_DB 
});

