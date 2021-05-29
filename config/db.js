const pg = require("pg");
const connectionString = process.env.CONNECTION_STRING;
const client = new pg.Client(connectionString);

module.exports = client;