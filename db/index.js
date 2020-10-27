const connection = require("./connect");

class dataBase {
    constructor(connection) {
        this.connection = connection;
    }

    viewEmployee() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id ORDER BY employee.id ASC;",
        );
    }

    viewRole() {
        return this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id ORDER BY role.id ASC;"
        );
    }

    viewDepartment() {
        return this.connection.query(
            "SELECT * from department ORDER BY id ASC"
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

    changeRole(employeeid, roleid) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleid, employeeid]
        );
    }

    changeManager(employeeid, managerid) {
        return this.connection.query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [managerid, employeeid]
        )
    }

    viewManager (employeeid) {
        return this.connection.query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeid
        )
    }
}

module.exports = new dataBase(connection);