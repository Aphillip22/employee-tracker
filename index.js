//require packages
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//connect to server
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "ThisIsAPassword123",
    database: "employee_tracker"
});

//throw error if fails to connect to host
connection.connect((err) => {
    if (err) throw err;
    //if no error, run search function
    dbSearch();
});

//search function
function dbSearch() {
    inquirer
        .prompt({
            name: "selection",
            type: "list",
            message: "What would you like to do today?",
            choices: [
                "View Employees",
                "View Departments",
                "View Roles",
                "Add Employee",
                "Add Department",
                "Add Role",
                "Update Employee Data",
                "Cancel"
            ]
        })
        .then(function (response) {
            if (response.selection === "View Employees") {
                viewEmployees();
            } else if (response.selection === "View Departments") {
                viewDepartments();
            } else if (response.selection === "View Roles") {
                viewRoles();
            } else if (response.selection === "Add Employee") {
                addEmployee();
            } else if (response.selection === "Add Department") {
                addDepartment();
            } else if (response.selection === "Add Role") {
                addRole();
            } else if (response.selection === "Update Employee Data") {
                updateEmployee();
            } else {
                connection.end();
            }
        });
};

//function to view all employees
function viewEmployees() {
        const query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id AS title, employee.manager_id, roles.title, roles.salary, department.dept_name AS dept FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id"
        
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.table(res)
            //prompt user to make a selection again
            dbSearch();
        }
    );
};

//function to view departments
function viewDepartments() {
        const query = "SELECT * FROM department"
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.table(res)
            //prompt user to make a selection again
            dbSearch();
        }
    );
};

//function to view roles
function viewRoles() {
        const query = "SELECT roles.id, roles.title, roles.salary, roles.department_id, department.id, department.dept_name FROM roles LEFT JOIN department on roles.department_id = department.id"
        connection.query(query, function (err, res) {
            if (err) throw err;
            console.table(res)
            //prompt user to make a selection again
            dbSearch();
        }
    );
};

const addRole = () => {
    inquirer.prompt([
        {
          name: 'roleTitle',
          type: 'input',
          message: 'What is the role title?',
        },
        {
          name: 'salary',
          type: 'input',
          message: 'What is the salary for this job?',
        },
        {
          name: 'deptId',
          type: 'input',
          message: 'What is the department ID number?',
        },
      ])
      .then(answer => {
        connection.query(
          'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)',
          [answer.roleTitle, answer.salary, answer.deptId],
          function (err, res) {
            if (err) throw err;
            console.log('Role added!');
            dbSearch();
          }
        );
      });
  };

  const addDepartment = () => {
    inquirer.prompt([
        {
          name: 'department',
          type: 'input',
          message: 'What is the department name?',
        },
      ])
      .then(answer => {
        connection.query(
          'INSERT INTO department (dept_name) VALUES (?)',
          [answer.department],
          function (err, res) {
            if (err) throw err;
            console.log('Department added!');
            dbSearch();
          }
        );
      });
  };

  const addEmployee = () => {
    inquirer.prompt([
        {
          name: 'firstName',
          type: 'input',
          message: "What is the employee's first name?",
        },
        {
          name: 'lastName',
          type: 'input',
          message: "What is the employee's last name?",
        },
        {
          name: 'roleId',
          type: 'input',
          message: "What is the employee's job id?",
        },
        {
          name: 'managerId',
          type: 'input',
          message: 'What is the manager Id?',
        },
      ])
      .then(answer => {
        connection.query(
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
          [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
          function (err, res) {
            if (err) throw err;
            console.log(`Employee record for ${answer.firstName} ${answer.lastName} has been added!`);
            dbSearch();
          }
        );
      });
  };
  
  const updateEmployee = () => {
    inquirer
      .prompt([
        {
          name: 'id',
          type: 'input',
          message: 'Enter employee id',
        },
        {
          name: 'roleId',
          type: 'input',
          message: 'Enter new role id',
        },
      ])
      .then(answer => {
        connection.query(
          'UPDATE employee SET role_id=? WHERE id=?',
          [answer.roleId, answer.id],
          function (err, res) {
            if (err) throw err;
            console.log(`Employee record has been updated!`);
            dbSearch();
          }
        );
      });
  };

// //empty arrays for choices
// const roleResponse = [];
// const employeeResponse = [];
// const departmentResponse = [];


// //functions to push table data to inquirer prompts
// function findRole() {
//     const query = "SELECT * FROM role"
//     connection.query(query, function (err, data) {
//         if (err) throw err;
//         for (i = 0; i < data.length; i++) {
//             roleResponse.push(data[i].id + "-" + data[i].title)
//         }
//     });
// };

// function findEmployee() {
//     const query = "SELECT * FROM employee"
//     connection.query(query, function (err, data) {
//         if (err) throw err;
//         for (i = 0; i < data.length; i++) {
//             employeeResponse.push(data[i].id + "-" + data[i].first_name + " " + data[i].last_name)
//         }
//     });
// };

// function findDepartment() {
//     const query = "SELECT * FROM department"
//     connection.query(query, function (err, data) {
//         if (err) throw err;
//         for (i = 0; i < data.length; i++) {
//             departmentResponse.push(data[i].id + "-" + data[i].name)
//         }
//     });
// };

//function to add employee
// function addEmployee() {

//     //run functions to fill choices arrays
//     findRole();
//     findEmployee();

//     //command line prompt messages
//     inquirer
//         .prompt([
//             {
//                 name: "first_name",
//                 type: "input",
//                 message: "Please input the employee's first name."
//             },

//             {
//                 name: "last_name",
//                 type: "input",
//                 message: "Please input the employee's last name."
//             },

//             {
//                 name: "role",
//                 type: "list",
//                 message: "Please input the employee's role.",
//                 choices: roleResponse
//             },

//             {
//                 name: "manager_info",
//                 type: "list",
//                 message: "Please input the employee's manager.",
//                 choices: employeeResponse
//             }

//         ])
//         //insert responses to employee table and display success message
//         .then(function (response) {
//             const getRole = response.role.split("-")
//             const getManager = response.manager_info.split("-")
//             const query =
//                 `INSERT INTO employee (first_name, last_name, role_id, manager_id)
//                 VALUES ('${response.first_name}','${response.last_name}','${getRole[0]}','${getManager[0]}')`;
//             connection.query(query, function (err, res) {
//                 cconsole.table(res)(`Your new employee, ${response.first_name} ${response.last_name}, has been added to the database!`)
//             });

//             //return to main menu
//             dbSearch();
//         });
// };

// function addRole() {

//     //run functions to fill choices array
//     findRole();
//     findEmployee();
//     findDepartment();

//     inquirer
//         .prompt([
//             {
//                 name: "role",
//                 type: "input",
//                 message: "Please enter the role that you would like added to the database."
//             },

//             {
//                 name: "dept",
//                 type: "list",
//                 message: "Please enter the department to which this role should be added.",
//                 choices: departmentResponse
//             },

//             {
//                 name: "salary",
//                 type: "number",
//                 message: "Please enter the base salary for this role."
//             },
//         ])
//         //insert responses to role table and display success message
//         .then(function (response) {
//             const getDepartment = response.dept.split("-")
//             const query =
//                 `INSERT INTO role (title, salary, department_id)
//      VALUES ('${response.role}','${response.salary}','${getDepartment[0]}')`;
//             connection.query(query, function (err, res) {
//                 console.table(res)(`You've added the new role, ${response.role}, to the database!`)
//             });

//             //return to main menu
//             dbSearch();
//         });
// };

// function addDepartment() {

//     //functions to fill choices arrays
//     findRole();
//     findEmployee();
//     findDepartment();

//     //command line prompt
//     inquirer
//         .prompt([
//             {
//                 name: "dept",
//                 type: "input",
//                 message: "Please input the name of the department you would like added to the system."
//             }
//         ])

//         //insert answer to department table
//         .then(function (response) {
//             const query =
//                 `INSERT INTO department (name)
//                 VALUES ('${response.dept}')`;
//             connection.query(query, function (err, res) {
//                 cconsole.table(res)(`You've added a new department, ${response.dept}, to the database!`)
//             });
//             //return to main mentu
//             dbSearch();
//         });
// };

// //function to update an employee role
// function updateEmployee() {
//     connection.query('SELECT * FROM employee', function (err, res) {
//         if (err) throw err;
//         inquirer
//             .prompt([
//                 {
//                     name: "employee_name",
//                     type: "list",
//                     message: "Please select the employee for whom you would like to update their role.",
//                     choices: function () {
//                         const employeeArray = [];
//                         result.forEach(result => {
//                             employeeArray.push(
//                                 result.last_name
//                             );
//                         });
//                         return employeeArray;
//                     }
//                 }
//             ])

//             .then(function (res) {
//                 cconsole.table(res)
//                 const name = response.employee_name;

//                 connection.query("SELECT * FROM role", function (err, res) {
//                     if (err) throw err;
//                     inquirer
//                         .prompt([
//                             {
//                                 name: "role",
//                                 type: "list",
//                                 message: "Please input the new role this employee will hold.",
//                                 choices: function () {
//                                     var roleArray = [];
//                                     res.forEach(res => {
//                                         roleArray.push(
//                                             res.title)
//                                     })
//                                     return roleArray;
//                                 }
//                             }
//                         ])

//                         .then(function (roleResponse) {
//                             const role = roleResponse.role;

//                             connection.query('SELECT * FROM role WHERE title = ?', [role], function (err, res) {
//                                 if (err) throw err;
//                                 let roleId = res[0].id;

//                                 let query = "UPDATE employee SET role_id = ? WHERE last_name =  ?";
//                                 let values = [parseInt(roleId), name]

//                                 connection.query(query, values,
//                                     function (err, res) {
//                                         if (err) throw err;
//                                         cconsole.table(res)(`You have successfully updated ${name}'s role to ${role}.`);
//                                     })


//                                 //return to main menu
//                                 dbSearch();
//                             });
//                         });
//                 });

//             });
//     });
// };