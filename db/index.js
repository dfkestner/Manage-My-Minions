const connection = require("./connections");

class dataBase {
    constructor(connection) {
        this.connection = connection;
    }

    viewEmployee() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name, manager.last_name AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id",
        );
    }

    viewRole() {
        return this.connection.query(
            "SELECT role.id, role.title, departement.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    viewDepartment() {
        return this.connection.query(
            "SELECT department.id, department.name, role.salary FROM employee LEFT JOIN role on employees.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
    }

    newEmployee(employee) {
        return this.connection.query(
            "INSERT INTO employee SET ?", 
            employee
        );
    }

    newRole(role) {
        return this.connection.query(
            "INSERT INTO role SET ?", 
            role
        );
    }

    newDepartment(department) {
        return this.connection.query(
            "INSERT INTO department SET ?",
            department
        );
    }

    changeRole(employeeID, roleId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeID]
        );
    }
}

module.exports = new dataBase(connection);