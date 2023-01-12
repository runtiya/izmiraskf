const mysql = require('mysql');

function connectDatabase() {
  const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '17Nisan1996',
    database: 'izmiraskf',
  });

  return connection;
}


exports.connectDatabase = connectDatabase;
