const queries = require("../../queries/application/statistics");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getTeamsCountByTown(req, res, next) {
  var teamsCountByTown = [];
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(queries.getTeamsCountByTown, (error, result) => {
    if (!error) {
      teamsCountByTown = result;
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

    const _teamsCountByTown = crypto.encryptData(teamsCountByTown);

    res.status(_resStatus).json({
      error: _error,
      message: _message,
      data: _teamsCountByTown,
    });
  });
}

function getStadiumsCountByTown(req, res, next) {
  var stadiumsCountByTown = [];
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(queries.getStadiumsCountByTown, (error, result) => {
    if (!error) {
      stadiumsCountByTown = result;
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

    const _stadiumsCountByTown = crypto.encryptData(stadiumsCountByTown);

    res.status(_resStatus).json({
      error: _error,
      message: _message,
      data: _stadiumsCountByTown,
    });
  });
}

function getStadiumsCountByFloorType(req, res, next) {
  var stadiumsCountByFloorType = [];
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(queries.getStadiumsCountByFloorType, (error, result) => {
    if (!error) {
      stadiumsCountByFloorType = result;
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

    const _stadiumsCountByFloorType = crypto.encryptData(stadiumsCountByFloorType);

    res.status(_resStatus).json({
      error: _error,
      message: _message,
      data: _stadiumsCountByFloorType,
    });
  });
}

function getMatchStatusCountByLeague(req, res, next) {
  var matchStatusCountByLeague = [];
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  const seasonId = +req.query.seasonid;

  connection.query(
    queries.getMatchStatusCountByLeague,
    [seasonId],
    (error, result) => {
      if (!error) {
        matchStatusCountByLeague = result;
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

      const _matchStatusCountByLeague = crypto.encryptData(matchStatusCountByLeague);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _matchStatusCountByLeague,
      });
  });
}

exports.getTeamsCountByTown = getTeamsCountByTown;
exports.getStadiumsCountByTown = getStadiumsCountByTown;
exports.getStadiumsCountByFloorType = getStadiumsCountByFloorType;
exports.getMatchStatusCountByLeague = getMatchStatusCountByLeague;
