DROP DATABASE if exists employee-tracker;
CREATE DATABASE employee-tracker;

USE employee-tracker;

CREATE TABLE employee {
    id INT PRIMARY AUTO_INCREMENT NOT NULL, 
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
};

CREATE TABLE role {
    id INT PRIMARY AUTO_INCREMENT NOT NULL, 
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
};

CREATE TABLE department {
    id INT PRIMARY AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
};