const mysql = require("mysql");
const util = require("util");

const connections = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "serenity6!",
    database: "minions_db"
});

connections.connect(function(err) {
    if (err) throw err;
});

connections.query = util.promisify(connection.query);

module.exports = connections