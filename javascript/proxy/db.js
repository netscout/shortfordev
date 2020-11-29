const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "dbwjvotmdnjem",
    database: "ProxyTest"
});

connection.connect();

module.exports = connection;