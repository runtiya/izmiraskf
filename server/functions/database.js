const environment = require('../environments/development');
const mysql = require('mysql');

function connectDatabase() {

  const connection = mysql.createConnection(environment.database);
  return connection;
}


exports.connectDatabase = connectDatabase;
