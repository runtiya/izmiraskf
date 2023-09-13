const mongoose = require('mongoose');

const errorLogsSchema = mongoose.Schema({
  timestamp: {type: Date, required: false, default: new Date()},
  status: {type: String, required: false},
  message: {type: String, required: false},
  explanation: {type: Object, required: false},
});

module.exports = mongoose.model('ErrorLogs', errorLogsSchema);
