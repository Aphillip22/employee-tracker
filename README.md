# Employee Tracker
  -[Description](#description)
  -[Installation](#installation)
  -[Usage](#usage)
  -[User-Story](#user-story)
  -[Acceptance-Criteria](#acceptance-criteria)
  -[Contributing](#contributing)
  -[Test](#test)
  -[Contact](#contact)
  -[Links](#links)
  # Description
  This is a command line application that provides a complete CMS database including the ability to view employees, view roles, view departments, add employees, add roles, add departments, and update employee records all from the command line prompt! 
  # Installation
  You will need npm, inquirer, and console.table packages to run this application.
  # Usage
  This project is intended to maintain a working employee database that will display tables of data and update data where applicable.
  # User-Story
  AS A business owner
  I WANT to be able to view and manage the departments, roles, and employees in my company
  SO THAT I can organize and plan my business
  # Acceptance-Criteria
  GIVEN a command-line application that accepts user input
  WHEN I start the application
  THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
  WHEN I choose to view all departments
  THEN I am presented with a formatted table showing department names and department ids
  WHEN I choose to view all roles
  THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
  WHEN I choose to view all employees
  THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  WHEN I choose to add a department
  THEN I am prompted to enter the name of the department and that department is added to the database
  WHEN I choose to add a role
  THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
  WHEN I choose to add an employee
  THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
  WHEN I choose to update an employee role
  THEN I am prompted to select an employee to update and their new role and this information is updated in the database
  # Contributors
  Amber Phillips
  # Technologies
  JavaScript,mySQL,node.js,npm,inquirer,console.table,CRUD
  # Contact
  For any questions or to discuss this project further, please reach out at amber.rain.phillips@gmail.com or Github: Aphillip22
  # Links
  Github Repo: https://github.com/Aphillip22/employee-tracker.git
  Walkthrough Video: https://drive.google.com/file/d/1iyevtz58-UQGnWzRSjb76sLVMins6zb1/view?usp=sharing