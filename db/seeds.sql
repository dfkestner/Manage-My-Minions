DROP DATABASE IF EXISTS minions_db;
CREATE DATABASE minions_db;

USE minions_db;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id)
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id)
);

INSERT INTO department (name)
VALUES ('Assets'), ('Receiving'), ('Outgoing');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 80000, 1), ('Clerk', 50000, 2), ('Agent', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Roger', 'Rogers', 1, NULL), ('Steve', 'Stevens', 2, 1), ('Andrew', 'Andrews', 3, 1);