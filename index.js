const mysql = require('mysql2');
const inquirer = require('inquirer');
const console = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3301,
    user: "root",
    password: "Shitballs$88",
    database: "employee-tracker"
});