# Manage My Minions

![License](https://img.shields.io/badge/License-The%20Unlicense-lightblue.svg)

## Description

Allows users to view the departments, roles, and employees of a supervillain's organization through NodeJS and MySQL. New departments, roles, and employees can be added, and employee roles and managers can be updated.

Future plans for development include additional search filter options, and enabling the user to delete departments, roles, and employees from the database.

## Screen Shots & Links
[Manage My Minions GitHub Repository](https://github.com/dfkestner/Manage-My-Minions)

![First Screen Shot](https://github.com/dfkestner/Manage-My-Minions/blob/main/ManageMinions1.png)
![Second Screen Shot](https://github.com/dfkestner/Manage-My-Minions/blob/main/ManageMinions2.png)

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [Credits](#credits)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

Clone the repository to your local directory, and use "npm i" to install dependencies. Open MySQL, use "Open SQL Script" to access the local directory where you've cloned the repository, and select the "seeds.sql" file, located in the "db" directory, to open the database in MySQL. Enter your MySQL password in "connect.js" and ensure the host, user, and database information is correct.

## Usage

Use "node app.js" to select the action you'd like to perform:
- View Employee List
- View Employee Roles
- View Department List
- Add New Employee
- Add New Role
- Add New Department
- Update Employee Role
- Update Employee Manager
- Exit Database

Follow the prompts to update or add new information. 

After each request is complete, you will be brought back to the list of options. 

When you are done using the database, select Exit Database to stop the process.

## License

The Unlicense

## Contributing

[Contributor Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md)

## Tests

N/A

## Questions

Feel free to email me at dfkestner@gmail.com with any questions about the repository. Visit my GitHub profile, [dfkestner](https://github.com/dfkestner/), to see more of my work!
