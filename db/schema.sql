DROP DATABASE if exists employee-tracker;
CREATE DATABASE employee-tracker;

DROP TABLE if exists employee;
DROP TABLE if exists roles;
DROP TABLE if exists department;

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

CREATE TABLE roles {
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
