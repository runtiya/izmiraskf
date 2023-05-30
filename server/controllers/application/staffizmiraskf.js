const connection = require('../../functions/database').connectDatabase();

function getStaffList(req, res, next) {
  var staffList;
  var message;

  connection.query(
    "select * from view_application_staffiaskf", (error, result) => {
      if (!error) {
        staffList = result;
      }
      else {
        message = error.sqlMessage;
        staffList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Staff fetched successfully!',
        staffList: staffList
      });
    });
}



exports.getStaffList = getStaffList;
