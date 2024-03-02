const app = require('./app');
const http = require('http');
const https = require('https');
const fs = require('fs');
const debug = require('debug')('node-angular');


const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privilages.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;

  console.log("server is onListening")
}


const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
var server;
if (process.env.NODE_ENV == "PROD") {
  server = https.createServer({
    key: fs.readFileSync('/etc/ssl/private.key'),
    cert: fs.readFileSync('/etc/ssl/certificate.crt'),
  }, app);
} else {
  server = http.createServer(app);
}

server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
