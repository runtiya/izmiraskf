const mongoose = require('mongoose');

const requestLogsSchema = mongoose.Schema({
  timestamp: {type: Date, required: false, default: new Date()},
  method: {type: String, required: false},
  url: {type: String, required: false},
  headers: {type: String, required: false},
  body: {type: String, required: false}
});

module.exports = mongoose.model('RequestLogs', requestLogsSchema);
