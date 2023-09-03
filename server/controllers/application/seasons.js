const queries = require("../../queries/application/seasons");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getSeasons(req, res, next) {
  var seasonList = [];
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getSeasons,
    (error, result) => {
      if (!error) {
        seasonList = result;
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

      const _seasonList = crypto.encryptData(seasonList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _seasonList,
      });
    }
  );
}

exports.getSeasons = getSeasons;
