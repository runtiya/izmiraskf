const environment = {
  production: false,
  development: true,
  database: {
    /*
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: '17Nisan1996',
    database: 'izmiraskf'*/
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: '17Nisan1996',
    database: 'izmiraskf',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 15000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0 , // 0 means there is no limit for queue total number
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  },
  cryptojsSecretKey: "7ce2daf0bdac7688ca2fd73f08a8e130",
  jwtSecretKey: "izmir_askf_jwt_secret_or_private_key" //"secret_this_should_be_longer"

};

module.exports = environment;
