INSERT INTO employee(id, first_name, last_name, role_id, manager_id) 
    VALUES 
    (1, "John", "Smith", 1, 1),
    (2, "Robert", "Walker", 2, 1),
    (3, "Sarah", "Spear", 4, 8),
    (4, "Jennifer", "Abbot", 3, 8),
    (5, "Henry", "Carrington", 5, 8),
    (6, "Alicia", "Gilbert", 2, 1),
    (7, "Joseph", "Jacobs", 3, 1),
    (8, "Mary", "Mildred", 1, 8),
    (9, "Bethany", "Alleman", 5, 1),
    (10, "Jake", "Johnson", 4, 1);

INSERT INTO roles(id, title, salary, department_id) 
    VALUES
    (1, 'Manager', 70000, 1),
    (2, 'Administration', 50000, 2),
    (3, 'Engineer', 90000, 3),
    (4, 'Accountant', 40000, 4),
    (5, 'Designer', 60000, 5);

INSERT INTO department(id, dept_name) 
    VALUES
    (1, 'Managers'),
    (2, 'Admin'),
    (3, 'Engineering'),
    (4, 'Accounting'),
    (5, 'Design');