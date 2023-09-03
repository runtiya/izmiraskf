const queries = require("../../queries/application/weeklymatchlist");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getWeeklyMatchList(req, res, next) {
  var weeklyMatchList = [];
  var seasonId = req.params.seasonid;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getWeeklyMatchList,
    [seasonId],
    (error, result) => {
      if (!error) {
        weeklyMatchList = result;
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

      const _weeklyMatchList = crypto.encryptData(weeklyMatchList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _weeklyMatchList,
      });
    }
  );
}

exports.getWeeklyMatchList = getWeeklyMatchList;
