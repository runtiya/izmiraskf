const queries = require("../../queries/admin/seasons");
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
    });
}

function createSeason(req, res, next) {
    const seasonInfo = req.body;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.createSeason,
      [
        seasonInfo.createdAt,
        seasonInfo.createdBy,
        seasonInfo.updatedAt,
        seasonInfo.updatedBy,
        seasonInfo.seasonName,
        seasonInfo.seasonYear,
        seasonInfo.isActive,
      ],
      (error, result) => {
        if (!error) {
          seasonInfo.id = result.insertId;
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

        const _seasonInfo = crypto.encryptData(seasonInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _seasonInfo,
        });
      }
    );
}

function updateSeason(req, res, next) {
    const seasonInfo = req.body;
    var _resStatus = 200;
    var _error = false;
    var _message = null;
    var seasonId = req.params.id;

    connection.query(
      queries.updateSeason,
      [
        seasonInfo.createdAt,
        seasonInfo.createdBy,
        seasonInfo.updatedAt,
        seasonInfo.updatedBy,
        seasonInfo.seasonName,
        seasonInfo.seasonYear,
        seasonInfo.isActive,
        seasonInfo.id || seasonId,
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

        const _seasonInfo = crypto.encryptData(seasonInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _seasonInfo,
        });
      }
    );
}

function deleteSeason(req, res, next) {
    var seasonId = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.deleteSeason,
      [seasonId],
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

exports.getSeasons = getSeasons;
exports.createSeason = createSeason;
exports.updateSeason = updateSeason;
exports.deleteSeason = deleteSeason;
