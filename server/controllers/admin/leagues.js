const queries = require("../../queries/admin/leagues");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getLeagues(req, res, next) {
    var leagueList = [];
    const seasonId = req.params.seasonid;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(queries.getLeagues,
      [seasonId],
      (error, result) => {
      if (!error) {
        leagueList = result;
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

      const _leagueList = crypto.encryptData(leagueList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _leagueList,
      });
    });
}

function createLeague(req, res, next) {
    var  leagueInfo = req.body;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.createLeague,
      [
        leagueInfo.createdAt,
        leagueInfo.createdBy,
        leagueInfo.updatedAt,
        leagueInfo.updatedBy,
        leagueInfo.seasonId,
        leagueInfo.leagueName,
        leagueInfo.category,
        leagueInfo.leagueType,
        leagueInfo.isActive,
        leagueInfo.orderNo,
      ],
      (error, result) => {
        if (!error) {
          leagueInfo = result.insertId;
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

        const _leagueInfo = crypto.encryptData(leagueInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _leagueInfo,
        });
      }
    );
}

function updateLeague(req, res, next) {
    const leagueInfo = req.body;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.updateLeague,
      [
        leagueInfo.createdAt,
        leagueInfo.createdBy,
        leagueInfo.updatedAt,
        leagueInfo.updatedBy,
        leagueInfo.seasonId,
        leagueInfo.leagueName,
        leagueInfo.category,
        leagueInfo.leagueType,
        leagueInfo.isActive,
        leagueInfo.orderNo,
        leagueInfo.id,
      ],
      (error, result) => {
        if (!error) {

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

        const _leagueInfo = crypto.encryptData(leagueInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _leagueInfo,
        });
      }
    );
}

function deleteLeague(req, res, next) {
    var leagueId = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.deleteLeague,
      [leagueId],
      (error, result) => {
        if (!error) {

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

        res.status(_resStatus).json({
          error: _error,
          message: _message
        });
    });
}

exports.getLeagues = getLeagues;
exports.createLeague = createLeague;
exports.updateLeague = updateLeague;
exports.deleteLeague = deleteLeague;
