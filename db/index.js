const connection = require("./connections");

class dataBase {
    constructor(connection) {
        this.connection = connection;
    }

    viewEmployee() {
        return this.connection.query(
            "SELECT employee.ID, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name, manager.last_name AS manager FROM employee LEFT JOIN role on employee.role_ID = role.ID LEFT JOIN department on role.department_ID = department.ID LEFT JOIN employee manager on manager.ID = employee.manager_ID",
        );
    }

    viewRole() {
        return this.connection.query(
            "SELECT role.ID, role.title, departement.name AS department, role.salary FROM role LEFT JOIN department on role.department_ID = department.ID;"
        );
    }

    viewDepartment() {
        return this.connection.query(
            "SELECT department.ID, department.name, role.salary FROM employee LEFT JOIN role on employees.role_ID = role.ID LEFT JOIN department on role.department_id = department.id GROUP BY department.ID, department.name;"
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

    changeRole(employeeID, roleID) {
        return this.connection.query(
            "UPDATE employee SET role_ID = ? WHERE ID = ?",
            [roleID, employeeID]
        );
    }

    changeManager(employeeID, managerID) {
        return this.connection.query(
            "UPDATE employee SET manager_ID = ? WHERE ID = ?",
            [managerID, employeeID]
        )
    }

    viewManager (employeeID) {
        return this.connection.query(
            "SELECT ID, first_name, last_name FROM employee WHERE id != ?",
            employeeID
        )
    }
}

module.exports = new dataBase(connection);