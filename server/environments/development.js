const environment = {
  production: false,
  development: true,
  database: {

    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,

    /*
    host: 'www.runtiya.online',
    user: 'izmiraskf',
    port: 3306,
    password: 'Askfdb35!',
    database: 'izmiraskf',
    */

    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 15000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0 , // 0 means there is no limit for queue total number
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  },
  cryptojsSecretKey: process.env.SYSTEM_CRYPTOJSSECRETKEY,
  jwtSecretKey: process.env.SYSTEM_JWTSECRETKEY,
  MongoAtlasUserName: process.env.MONGO_ATLAS_USERNAME,
  MongoAtlasPassword: process.env.MONGO_ATLAS_PASSWORD
};

module.exports = environment;
