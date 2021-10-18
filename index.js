//require packages
const mysql = require('mysql2');
const inquirer = require('inquirer');
const console = require('console.table');

//connect to server
const router = mysql.createConnection({
    host: "localhost",
    port: 3301,
    user: "root",
    password: "Shitballs$88",
    database: "employee-tracker"
});

//throw error if fails to connect to host
router.connect((err) => {
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
            console.log(response);
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
                router.end();
            }
        });
};

//function to view all employees
function viewEmployees() {
    router.query(
        "SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id",
        function (err, result) {
            if (err) throw err;
            console.table(result);
            //prompt user to make a selection again
            dbSearch();
        }
    );
};

//function to view departments
function viewDepartments() {
    router.query(
        "SELECT * FROM department",
        function (err, result) {
            if (err) throw err;
            console.table(result);
            //prompt user to make a selection again
            dbSearch();
        }
    );
};

//function to view roles
function viewRoles() {
    router.query(
        "SELECT * FROM roles LEFT JOIN department ON role.department_id = department.id",
        function (err, result) {
            if (err) throw err;
            console.table(result);
            //prompt user to make a selection again
            dbSearch();
        }
    );
};

//empty arrays for choices
const roleResponse = [];
const employeeResponse = [];
const departmentResponse = [];


//functions to push table data to inquirer prompts
function findRole() {

    router.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            roleResponse.push(data[i].id + "-" + data[i].title)
        }
    });
};

function findEmployee() {
    router.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            employeeResponse.push(data[i].id + "-" + data[i].first_name + " " + data[i].last_name)
        }
    });
};

function findDepartment() {
    router.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            departmentResponse.push(data[i].id + "-" + data[i].name)
        }
    });
};

//function to add employee
function addEmployee() {

    //run functions to fill choices arrays
    findRole();
    findEmployee();

    //command line prompt messages
    inquirer
    .prompt ([
        {
            name: "first_name",
            type: "input",
            message: "Please input the employee's first name."
        },

        {
            name: "last_name",
            type: "input",
            message: "Please input the employee's last name."
        },

        {
            name: "role",
            type: "list",
            message: "Please input the employee's role.",
            choices: roleResponse
        },

        {
            name: "manager_info",
            type: "list",
            message: "Please input the employee's manager.",
            choices: employeeResponse
        }

    ])
    //insert responses to employee table and display success message
    .then(function (response) {
        const getRole = response.role.split("-")
        const getManager = response.manager_info.split("-")
        const query =
            `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ('${response.first_name}','${response.last_name}','${getRole[0]}','${getManager[0]}')`;
        router.query(query, function (err, res) {
            console.log(`Your new employee, ${response.first_name} ${response.last_name}, has been added to the database!`)
        });

        //return to main menu
        dbSearch();
    });
};

function addRole() {

    //run functions to fill choices array
    findRole();
    findEmployee();
    findDepartment();

    inquirer
    .prompt ([
        {
            name: "role",
            type: "input",
            message: "Please enter the role that you would like added to the database."
        },

        {
            name: "dept",
            type: "list",
            message: "Please enter the department to which this role should be added.",
            choices: departmentResponse
        },

        {
            name: "salary",
            type: "number",
            message: "Please enter the base salary for this role."
        },
    ])
    //insert responses to role table and display success message
    .then(function (response) {
        const getDepartment = response.dept.split("-")
        const query =
            `INSERT INTO role (title, salary, department_id)
     VALUES ('${response.role}','${response.salary}','${getDepartment[0]}')`;
        router.query(query, function (err, res) {
            console.log(`You've added the new role, ${response.role}, to the database!`)
        });

        //return to main menu
        dbSearch();
    });
};

function addDepartment() {

    //functions to fill choices arrays
    findRole();
    findEmployee();
    findDepartment();

    //command line prompt
    inquirer
    .prompt ([
        {
            name: "dept",
            type: "input",
            message: "Please input the name of the department you would like added to the system."
        }
    ])

    //insert answer to department table
    .then(function (response) {
        const query =
            `INSERT INTO department (name)
                VALUES ('${response.dept}')`;
        router.query(query, function (err, res) {
            console.log(`You've added a new department, ${response.dept}, to the database!`)
        });
        //return to main mentu
        dbSearch();
    });
};

//function to update an employee role
function updateEmployee() {
    router.query('SELECT * FROM employee', function (err, result) {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: "employee_name",
                type: "list",
                message: "Please select the employee for whom you would like to update their role.",
                choices: function () {
                         const employeeArray = [];
                         result.forEach(result => {
                            employeeArray.push(
                                result.last_name
                            );
                        });
                        return employeeArray;
                    }
                }
            ])

            .then(function (response) {
                console.log(response);
                const name = response.employee_name;

                router.query("SELECT * FROM role", function (err, res) {
                    if (err) throw err;
                    inquirer
                    .prompt([
                        {
                            name: "role",
                            type: "list",
                            message: "Please input the new role this employee will hold.",
                            choices: function () {
                                    var roleArray = [];
                                    res.forEach(res => {
                                        roleArray.push(
                                            res.title)
                                    })
                                    return roleArray;
                                }
                            }
                        ])
                        
                        .then(function (roleResponse) {
                            const role = roleResponse.role;
                         
                            router.query('SELECT * FROM role WHERE title = ?', [role], function (err, res) {
                                if (err) throw err;
                                let roleId = res[0].id;

                                let query = "UPDATE employee SET role_id = ? WHERE last_name =  ?";
                                let values = [parseInt(roleId), name]

                                router.query(query, values,
                                    function (err, res) {
                                        if(err) throw err;
                                        console.log(`You have successfully updated ${name}'s role to ${role}.`);
                                    })


                                //return to main menu
                                dbSearch();
                            });
                        });
                });
            
            });
    });
};