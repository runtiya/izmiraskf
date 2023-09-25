const queries = require("../../queries/admin/weeklymatchprogram");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getWeeklyMatchProgram(req, res, next) {
    var weeklyMatchProgramList = [];
    var _resStatus = 200;
    var _error = false;
    var _message = null;
    var seasonId = req.params.seasonid;

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

function createWeeklyMatchProgram(req, res, next) {
    const weeklyMatchProgramInfo = req.body;
    var _resStatus = 200;
    var _error = false;
    var _message = null;
    var weeklyMatchProgramId;

    connection.query(
      queries.createWeeklyMatchProgram,
      [
        weeklyMatchProgramInfo.createdAt,
        weeklyMatchProgramInfo.createdBy,
        weeklyMatchProgramInfo.updatedAt,
        weeklyMatchProgramInfo.updatedBy,
        weeklyMatchProgramInfo.seasonId,
        weeklyMatchProgramInfo.beginDate,
        weeklyMatchProgramInfo.endDate,
        weeklyMatchProgramInfo.isActive,
      ],
      (error, result) => {
        if (!error) {
          weeklyMatchProgramInfo.id = result.insertId;
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

        const _weeklyMatchProgramInfo = crypto.encryptData(weeklyMatchProgramInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _weeklyMatchProgramInfo,
        });
      }
    );
}

function updateWeeklyMatchProgram(req, res, next) {
    const weeklyMatchProgramInfo = req.body;
    var _resStatus = 200;
    var _error = false;
    var _message = null;
    var seasonId = req.params.seasonid;
    var weeklyMatchProgramId = req.params.id;

    connection.query(
      queries.updateWeeklyMatchProgram,
      [
        weeklyMatchProgramInfo.createdAt,
        weeklyMatchProgramInfo.createdBy,
        weeklyMatchProgramInfo.updatedAt,
        weeklyMatchProgramInfo.updatedBy,
        weeklyMatchProgramInfo.seasonId,
        weeklyMatchProgramInfo.beginDate,
        weeklyMatchProgramInfo.endDate,
        weeklyMatchProgramInfo.isActive,
        weeklyMatchProgramId || weeklyMatchProgramInfo.id,
        seasonId || weeklyMatchProgramInfo.seasonId,
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

        const _weeklyMatchProgramInfo = crypto.encryptData(weeklyMatchProgramInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _weeklyMatchProgramInfo,
        });
      }
    );
}

function deleteWeeklyMatchProgram(req, res, next) {
    var seasonId = req.params.seasonid;
    var weeklyMatchProgramId = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.deleteWeeklyMatchProgram,
      [weeklyMatchProgramId, seasonId],
      (error, result) => {
        if (!error) {

        } else {
          if (error.errno == 1451) {
            errorService.handleError(
              errorService.errors.DATABASE_FOREIGNKEY_ERROR.code,
              errorService.errors.DATABASE_FOREIGNKEY_ERROR.message,
              error.sqlMessage
            );

            _error = true;
            _resStatus = errorService.errors.DATABASE_FOREIGNKEY_ERROR.code;
            _message = errorService.errors.DATABASE_FOREIGNKEY_ERROR.message;
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
        }

        res.status(_resStatus).json({
          error: _error,
          message: _message
        });
      }
    );
}

exports.getWeeklyMatchProgram = getWeeklyMatchProgram;
exports.createWeeklyMatchProgram = createWeeklyMatchProgram;
exports.updateWeeklyMatchProgram = updateWeeklyMatchProgram;
exports.deleteWeeklyMatchProgram = deleteWeeklyMatchProgram;
