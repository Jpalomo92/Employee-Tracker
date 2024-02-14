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
)

db.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  mainPrompt();
});

function mainPrompt(){
  inquirer.prompt([
    {
      type: 'list',
      name: 'userChoice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]

    }
  ]).then((res) =>{
    console.log(res.userChoice);
    switch(res.userChoice){
      case 'View all departments':
       viewAllDepartments();
       break;

      case 'View all roles':
       viewAllRoles();
       break;

      case 'View all employees':
       viewAllEmployees();
       break;

      case 'Add a department':
      addDepartment();
       break;

      case 'Add a role':
       addRole();
       break;

      case 'Add an employee':
       addEmployee();
       break;

      case 'Update an employee role':
       updateEmployeeRole();
       break;

      case 'Exit':
       db.end();
       break;
    }
  }).catch((err)=>{
    if(err) throw err;
  })
}

//see all department names and ids
function viewAllDepartments(){
  let query = 'SELECT department.id, department.name AS department FROM department'
  db.query(query, (err, res) =>{
    if (err) throw err;
    console.table(res);
    mainPrompt();
  })
}

//see roles id, title, department, and salary
function viewAllRoles(){
  let query = 'SELECT roles.id, roles.title, roles.salary, department.name AS department FROM roles JOIN department ON department.id = roles.department_id'
  db.query(query, (err, res) =>{
    if (err) throw err;
    console.table(res);
    mainPrompt();
  })
}

//see all employee id, first and last name, job title, department, salary, and manager
function viewAllEmployees(){
  let query = 'SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee JOIN roles ON roles.id = employee.role_id JOIN department ON department.id = roles.department_id JOIN employee manager ON manager.id = employee.manager_id'
  db.query(query, (err, res) =>{
    if (err) throw err;
    console.table(res);
    mainPrompt();
  })
}

// db.query('SELECT * FROM department', function (err, results) {
//     console.log(results);
//   });

  // Default response for any other request (Not Found)

  

  