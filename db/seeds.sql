INSERT INTO employee(first_name, last_name, role_id, manager_id) 
    VALUES 
    ("John", "Smith", 1, 1),
    ("Robert", "Walker", 2, 1),
    ("Sarah", "Spear", 4, 1),
    ("Jennifer", "Abbot", 3, 1),
    ("Henry", "Carrington", 5, 1),
    ("Alicia", "Gilbert", 2, 1),
    ("Joseph", "Jacobs", 3, 1),
    ("Mary", "Mildred", 1, 1 ),
    ("Bethany", "Alleman", 5, 1),
    ("Jake", "Johnson", 4, 1);

INSERT INTO roles(title, salary, department_id) 
    VALUES
    ('Manager', 70000, 1),
    ('Administration', 50000, 2),
    ('Engineer', 90000, 3),
    ('Accountant', 40000, 4),
    ('Designer', 60000, 5);

INSERT INTO department(name) 
    VALUES
    ('Managers'),
    ('Admin'),
    ('Engineering'),
    ('Accounting'),
    ('Design');