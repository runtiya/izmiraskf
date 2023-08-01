const queries = require("../../queries/application/staffizmiraskf");
const connection = require("../../functions/database").connectDatabase();

function getStaffList(req, res, next) {
  try {
    var staffList;
    var message;

    connection.query(
      queries.getStaffList,
      (error, result) => {
        if (!error) {
          staffList = result;
        } else {
          message = error.sqlMessage;
          staffList = [];
        }

        res.status(200).json({
          staffList: staffList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getStaffList = getStaffList;
