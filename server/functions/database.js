const environment = require('../environments/development');
/*const mysql = require('mysql');


function connectDatabase() {

  const connection = mysql.createConnection(environment.database);
  return connection;
}


exports.connectDatabase = connectDatabase;
*/

const mysql2 = require('mysql2');

const pool = mysql2.createPool(environment.database);

module.exports = pool;
