const util = require('util');
const mysql = require('mysql');
require("dotenv").config();
const connection = mysql.createConnection({
  host: 'localhost',
  // Your username
  user: 'root',
  // Your password
  password: process.env.MYSQL_PASSWORD,
  database: 'employees',
});

connection.connect(function (err) {
  if (err) throw err;
});

// Setting up connection.query to use promises instead of callbacks
// This allows us to use the async/await syntax
connection.query = util.promisify(connection.query);

module.exports = connection;