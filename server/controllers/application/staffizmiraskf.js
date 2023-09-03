const queries = require("../../queries/application/staffizmiraskf");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getStaffList(req, res, next) {
  var staffList = [];
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getStaffList,
    (error, result) => {
      if (!error) {
        staffList = result;
      } else {
        errorService.handleError(
          errorService.errors.DATABASE_ERROR.code,
          errorService.errors.DATABASE_ERROR.message,
          error.sqlMessage
        );

        _error = true;
        _resStatus = errorService.errors.DATABASE_ERROR.code;
        _message = errorService.errors.DATABASE_ERROR.message;
      }

      const _staffList = crypto.encryptData(staffList );

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _staffList,
      });
    }
  );
}

exports.getStaffList = getStaffList;
