const environment = {
  production: true,
  development: false,
  database: {
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: '17Nisan1996',
    database: 'izmiraskf'
  },
  cryptojsSecretKey: "7ce2daf0bdac7688ca2fd73f08a8e130",
  jwtSecretKey: "izmir_askf_jwt_secret_or_private_key" //"secret_this_should_be_longer"

};

module.exports = environment;
