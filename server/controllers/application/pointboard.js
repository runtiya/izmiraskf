const queries = require("../../queries/application/pointboard");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getPointBoard(req, res, next) {
  const groupstageId = req.params.groupstageid;
  const matchWeek = req.params.matchweek;
  var pointBoard = [];
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getPointBoard,
    [groupstageId, matchWeek],
    (error, result) => {
      if (!error) {
        pointBoard = result;
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

      const _pointBoard = crypto.encryptData(pointBoard);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _pointBoard,
      });
    }
  );
}

exports.getPointBoard = getPointBoard;
