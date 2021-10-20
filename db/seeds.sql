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

INSERT INTO role(title, salary, department_id) 
    VALUES
    ('Manager', 7000000, 1),
    ('Administration', 5000000, 2),
    ('Engineer', 9000000, 3),
    ('Accountant', 4000000, 4),
    ('Designer', 6000000, 5);

INSERT INTO department(name) 
    VALUES
    ('Managers'),
    ('Admin'),
    ('Engineering'),
    ('Accounting'),
    ('Design');