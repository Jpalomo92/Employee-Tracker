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
  let query = 
    `SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager 
    FROM employee 
    JOIN roles ON roles.id = employee.role_id 
    JOIN department ON department.id = roles.department_id 
    LEFT JOIN employee manager ON manager.id = employee.manager_id`;
  db.query(query, (err, res) =>{
    if (err) throw err;
    console.table(res);
    mainPrompt();
  })
}

//adds the name of the department and then added to db
function addDepartment(){
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Department Name: ',

    }
  ]).then((res) =>{
    let query =`INSERT INTO department SET ?`;
    db.query(query, {name: res.name},(err, res) =>{
      if(err) throw err;
      mainPrompt();
    })
  })

}

//add the name, salary, and department for the role - then role is added to db
function addRole(){
  var query = 
  `SELECT
    department.id,
    department.name,
    roles.salary
    FROM employee
    JOIN roles
      ON employee.role_id = roles.id
    JOIN department
      ON department.id = roles.department_id
     `
   
   //pulls a list of departments id and names
    db.query(query,(err, res) =>{
      if(err)throw err;

      const department = res.map(({ id, name }) => ({
        value: id,
        name: `${id} ${name}`
      }));

      console.table(res);
      addToRole(department);
    })
}

function addToRole(department){
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Role title: "
      },
      {
        type: "input",
        name: "salary",
        message: "Role Salary: "
      },
      {
        type: "list",
        name: "department",
        message: "Department: ",
        choices: department
      },
    ]).then((res)=>{
      let query = `INSERT INTO roles SET ?`;

      db.query(query, {
          title: res.title,
          salary: res.salary,
          department_id: res.department
      },(err, res)=>{
          if(err) throw err;
          mainPrompt();
      });
  });
}


//enter employee's first name, last name, role, and manager - employee then added to db
function addEmployee(){
  let query = 
  `SELECT 
      roles.id, 
      roles.title, 
      roles.salary 
  FROM roles`

db.query(query,(err, res)=>{
  if(err)throw err;

  const role = res.map(({ id, title, salary }) => ({
    value: id, 
    title: `${title}`, 
    salary: `${salary}`
  }));

  console.table(res);
  employeeRoles(role);

});
}

function employeeRoles(role) {
  inquirer
    .prompt([
    {
      type: "input",
      name: "firstName",
      message: "Employee First Name: "
    },
    {
      type: "input",
      name: "lastName",
      message: "Employee Last Name: "
    },
    {
      type: "list",
      name: "roleId",
      message: "Employee Role: ",
      choices: role
    }
  ]).then((res)=>{
      let query = `INSERT INTO employee SET ?`
      db.query(query,{
        first_name: res.firstName,
        last_name: res.lastName,
        role_id: res.roleId
      },(err, res)=>{
        if(err) throw err;
        mainPrompt();
    });
  });
}



//function will allow you to select an employee 
function updateEmployeeRole(){
  let query = 
  `SELECT 
    employee.id,
    employee.first_name, 
    employee.last_name, 
    roles.title, 
    department.name, 
    roles.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  JOIN roles
    ON employee.role_id = roles.id
  JOIN department
    ON department.id = roles.department_id
  LEFT JOIN employee manager
    ON manager.id = employee.manager_id`
  
    db.query(query,(err, res)=>{
      if(err)throw err;
      const employee = res.map(({ id, first_name, last_name }) => ({
        value: id,
         name: `${first_name} ${last_name}`      
      }));
      console.table(res);
      updateRole(employee);
    });
  
}

function updateRole(employee){
  let query = 
  `SELECT 
    roles.id, 
    roles.title, 
    roles.salary 
  FROM roles`

  db.query(query,(err, res)=>{
    if(err)throw err;

    let roleChoices = res.map(({ id, title, salary }) => ({
      value: id, 
      title: `${title}`, 
      salary: `${salary}`      
    }));

    console.table(res);
    getUpdatedRole(employee, roleChoices);
  });
}

function getUpdatedRole(employee, roleChoices) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: `Employee who's role will be Updated: `,
        choices: employee
      },
      {
        type: "list",
        name: "role",
        message: "Select New Role: ",
        choices: roleChoices
      },

    ]).then((res)=>{
      let query = `UPDATE employee SET role_id = ? WHERE id = ?`
      db.query(query,[ res.role, res.employee],(err, res)=>{
          if(err)throw err;
          mainPrompt();
        });
    });
}
// db.query('SELECT * FROM department', function (err, results) {
//     console.log(results);
//   });

  // Default response for any other request (Not Found)

  

  