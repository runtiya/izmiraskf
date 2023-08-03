const queries = require("../../queries/application/staffizmiraskf");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getStaffList(req, res, next) {
  try {
    var staffList = [];
    var message;

    connection.query(
      queries.getStaffList,
      (error, result) => {
        if (!error) {
          staffList = result;
        } else {
          console.log(error.sqlMessage)
          message = error.sqlMessage;
        }

        const _staffList  = crypto.encryptData(staffList );

        res.status(200).json({
          data: _staffList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getStaffList = getStaffList;
