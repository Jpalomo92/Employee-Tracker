const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const inquirer = require('inquirer');

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'registrar_db'
  },
  console.log(`Connected to the registrar_db database.`)
);


db.query('SELECT * FROM department', function (err, results) {
    console.log(results);
  });

  // Default response for any other request (Not Found)

  

  