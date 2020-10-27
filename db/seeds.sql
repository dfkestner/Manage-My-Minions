DROP DATABASE IF EXISTS minions_db;
CREATE DATABASE minions_db;

USE minions_db;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) UNIQUE NOT NULL,
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
VALUES ('Evil Fortress Maintenance'), ('Mad Science Research and Development'), ('Supervisor of Supervillainry');

INSERT INTO role (title, salary, department_ID)
VALUES ('Supervillain', 8000000, 3), ('Scientist', 5000000, 2), ('Minion', 6000, 1);

INSERT INTO employee (first_name, last_name, role_ID, manager_ID)
VALUES  ('Felonius', 'Gru', 1, NULL), ('Doctor', 'Nefario', 2, 1), ('Kevin', 'Minion', 3, 1);