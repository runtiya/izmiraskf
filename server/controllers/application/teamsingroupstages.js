const queries = require("../../queries/application/teamsingroupstages");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getTeamsInGroupstages(req, res, next) {
  const groupstageId = req.params.groupstageId;
  var teamsingroupstagesList = [];
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getTeamsInGroupstages,
    [groupstageId],
    (error, result) => {
      if (!error) {
        teamsingroupstagesList = result;
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

      const _teamsingroupstagesList = crypto.encryptData(teamsingroupstagesList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _teamsingroupstagesList,
      });
    }
  );
}

function getTeamsForGroupstages(req, res, next) {
  var teamsList = [];
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getTeamsForGroupstages,
    (error, result) => {
      if (!error) {
        teamsList = result;
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

      const _teamsList = crypto.encryptData(teamsList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _teamsList,
      });
    }
  );
}

exports.getTeamsInGroupstages = getTeamsInGroupstages;
exports.getTeamsForGroupstages = getTeamsForGroupstages;
