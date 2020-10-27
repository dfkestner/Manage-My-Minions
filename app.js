const {prompt} = require("inquirer");
const dataBase = require("./db");
const {printTable} = require('console-table-printer');

beginPrompts();

async function beginPrompts() {
    const {choice} = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View Employee List",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View Employee Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View Department List",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add New Employee",
                    value: "NEW_EMPLOYEES"
                },
                {
                    name: "Add New Role",
                    value: "NEW_ROLES"
                },
                {
                    name: "Add New Department",
                    value: "NEW_DEPARTMENTS"
                },
                {
                    name: "Update Employee Role",
                    value: "CHANGE_ROLES"
                },
                {
                    name: "Update Employee Manager",
                    value: "CHANGE_MANAGERS"
                },
                {
                    name: "Exit Database",
                    value: "EXIT"
                }
            ]
        }
    ]);

    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_ROLES":
            return viewRoles();
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "NEW_EMPLOYEES":
            return newEmployees();
        case "NEW_ROLES":
            return newRoles();
        case "NEW_DEPARTMENTS":
            return newDepartments();
        case "CHANGE_ROLES":
            return changeRoles();
        case "CHANGE_MANAGERS":
            return changeManagers();
        case "EXIT":
            return exitDataBase();
    }
}

async function viewEmployees() {
    const employees = await dataBase.viewEmployee();

    console.log("\n");
    
    printTable(employees);

    beginPrompts();
}

async function viewRoles() {
    const roles = await dataBase.viewRole();

    console.log("\n");

    printTable(roles);

    beginPrompts();
}

async function viewDepartments() {
    const departments = await dataBase.viewDepartment();

    console.log("\n");

    printTable(departments);

    beginPrompts();
}

async function newEmployees() {
    const employees = await dataBase.viewEmployee();
    const roles = await dataBase.viewRole();
    
    const employee = await prompt([
        {
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ]);

    const chooseRole = roles.map(({ID, title}) => ({
        name: title,
        value: ID
    }));

    const {roleID} = await prompt({
        type: "list",
        name: "roleID",
        message: "Please select the employee's role",
        choices: chooseRole
    });

    employee.role_ID = roleID;

    const chooseManager = employees.map(({ID, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: ID
    }));

    chooseManager.unshift({ name: "None", value: null });
    const {managerID} = await prompt ({
        type: "list",
        name: "managerID",
        message: "Please select the employee's manager",
        choices: chooseManager
    });

    employee.manager_ID = managerID;

    await dataBase.newEmployee(employee);

    console.log(`${employee.first_name} ${employee.last_name} has been added successfully!`)

    beginPrompts();
}

async function newRoles() {
    const departments = await dataBase.viewDepartment();

    const chooseDepartment = departments.map(({ID, name}) => ({
        name: name,
        value: ID
    }));

    const role = await prompt([
        {
            name: "Role Name",
            message: "Please enter a name for the new role"
        },
        {
            name: "Salary",
            message: "Please enter the salary for the new role"
        },
        {
            type: "list",
            name: "Department List",
            message: "Please select a department for the new role",
            choices: chooseDepartment
        }
    ]);

    await dataBase.newRole(role);

    console.log(`${role.title} has been added successfully!`);

    beginPrompts();
}

async function newDepartments() {
    const department = await prompt([
        {
            name: "Department Name",
            message: "Please enter a name for the new Department"
        }
    ]);

    await dataBase.newDepartment(department);

    console.log(`${department.name} has been added successfully!`);

    beginPrompts();
}

async function changeRoles() {
    const employees = await dataBase.viewEmployee();

    const chooseEmployee = employees.map(({ID, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: ID
    }));

    const {employeeID} = await prompt ([
        {
            type: "list",
            name: "employeeID",
            message: "Please select the employee who is changing roles",
            choices: chooseEmployee
        }
    ]);

    const roles = await dataBase.viewRole();

    const chooseRole = roles.map(({ID, title}) =>({
        name: title,
        value: ID
    }));

    const {roleID} = await prompt([
        {
            type: "list",
            name: "roleID",
            message: "What is the employee's new role?",
            choices: chooseRole
        }
    ]);

    await dataBase.changeRole(employeeID, roleID);

    console.log(`${chooseEmployee.name}'s role has been updated successfully!`)

    beginPrompts();
}

async function changeManagers() {
    const employees = await dataBase.viewEmployee();

    const chooseEmployee = employees.map(({ID, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: ID
    }));

    const {employeeID} = await prompt ([
        {
            type: "list",
            name: "employeeID",
            message: "Please select the employee who is changing managers",
            choices: chooseEmployee
        }
    ]);

    const managers = await dataBase.viewManager(employeeID);

    const chooseManager = managers.map(({ID, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: ID
    }));

    const {managerID} = await prompt([
        {
            type: "list",
            name: "managerID",
            message: "Please select the employee's new manager",
            choices: chooseManager
        }
    ]);

    await dataBase.changeManager(employeeID, managerID);

    console.log(`${chooseEmployee.name}'s manager has been successfully updated to ${chooseManager.name}!`)

    beginPrompts();
}

async function exitDataBase() {
    console.log("Exiting Manage My Minions...");
    process.exit();
}