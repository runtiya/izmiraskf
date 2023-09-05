const queries = require("../../queries/application/weeklymatchprogram");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getWeeklyMatchProgram(req, res, next) {
  var weeklyMatchProgramList = [];
  var seasonId = req.params.seasonid;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getWeeklyMatchProgram,
    [seasonId],
    (error, result) => {
      if (!error) {
        weeklyMatchProgramList = result;
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

      const _weeklyMatchProgramList = crypto.encryptData(weeklyMatchProgramList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _weeklyMatchProgramList,
      });
    }
  );
}

exports.getWeeklyMatchProgram = getWeeklyMatchProgram;
