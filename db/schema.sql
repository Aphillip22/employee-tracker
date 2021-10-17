DROP DATABASE if exists employee-tracker;
CREATE DATABASE employee-tracker;

USE employee-tracker;

CREATE TABLE employee {
    id INT PRIMARY AUTO_INCREMENT NOT NULL, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (manager_id),
    FOREIGN KEY (role_id)
};

CREATE TABLE role {
    id INT PRIMARY AUTO_INCREMENT NOT NULL, 
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
};

CREATE TABLE department {
    id INT PRIMARY AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL
};

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("John", "Smith", 1, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Robert", "Walker", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Sarah", "Spear", 4, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Jennifer", "Abbot", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Henry", "Carrington", 5, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Alicia", "Gilbert", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Joseph", "Jacobs", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Mary", "Mildred", 1, 1 );
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Bethany", "Alleman", 5, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Jake", "Johnson", 4, 1);

INSERT INTO role(title, salary, department_id) VALUES('Manager', 7000000, 1);
INSERT INTO role(title, salary, department_id) VALUES('Administration', 5000000, 2);
INSERT INTO role(title,  salary, department_id) VALUES('Engineer', 9000000, 3);
INSERT INTO role(title, salary, department_id) VALUES('Accountant', 4000000, 4);
INSERT INTO role(title, salary, department_id) VALUES('Designer', 6000000, 5);

INSERT INTO department(name) VALUES('Managers'),('Admin'),('Engineering'),('Accounting'),('Design');