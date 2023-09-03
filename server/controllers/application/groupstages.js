const queries = require("../../queries/application/groupstages");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getGroupStages(req, res, next) {
  var groupstageList = [];
  const leagueId = req.params.leagueid;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getGroupStages,
    [leagueId],
    (error, result) => {
      if (!error) {
        groupstageList = result;
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

      const _groupstageList = crypto.encryptData(groupstageList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _groupstageList,
      });
    }
  );
}

function getWeekSequence(req, res, next) {
  const groupstageId = req.params.id;
  var weekSequence = [];
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getWeekSequence,
    [groupstageId],
    (error, result) => {
      if (!error) {
        weekSequence = result;
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

      const _weekSequence = crypto.encryptData(weekSequence);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _weekSequence,
      });
    }
  );
}

function getPlayedLastMatchWeek(req, res, next) {
  const groupstageId = req.params.id;
  var matchWeek = 1;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getPlayedLastMatchWeek,
    [groupstageId],
    (error, result) => {
      if (!error) {
        matchWeek = result[0].matchWeek || 1;
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

      const _matchWeek = crypto.encryptData(matchWeek);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _matchWeek,
      });
    }
  );
}

exports.getGroupStages = getGroupStages;
exports.getWeekSequence = getWeekSequence;
exports.getPlayedLastMatchWeek = getPlayedLastMatchWeek;
