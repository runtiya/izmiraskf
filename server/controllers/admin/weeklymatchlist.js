const queries = require("../../queries/admin/weeklymatchlist");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getWeeklyMatchList(req, res, next) {
    var weeklyMatchList = [];
    var weeklyMatchProgramId = req.params.weeklymatchprogramid;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.getWeeklyMatchList,
      [weeklyMatchProgramId],
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

function createWeeklyMatchList(req, res, next) {
  const weeklyMatchList = req.body;
  var _resStatus = 200;
  var _error = false;
  var _message = null;
  var _error = false;

  const _promises = weeklyMatchList.map((match) => {
    return new Promise(async (resolve, reject) => {
      connection.query(
        queries.createWeeklyMatchList,
        [
          match.createdAt,
          match.createdBy,
          match.updatedAt,
          match.updatedBy,
          match.weeklyMatchProgramId,
          match.matchId,
          match.matchNo,
          match.isInList,
        ],
        (error, result) => {
          if (!error) {
            resolve();
          } else {
            reject(error);
          }
        }
      );
    });
  });

  Promise.all(_promises)
    .then(() => {

    })
    .catch((error) => {
      errorService.handleError(
        errorService.errors.DATABASE_ERROR.code,
        errorService.errors.DATABASE_ERROR.message,
        error.sqlMessage
      );

      _error = true;
      _resStatus = errorService.errors.DATABASE_ERROR.code;
      _message = errorService.errors.DATABASE_ERROR.message;
    })
    .finally(() => {
      res.status(_resStatus).json({
        error: _error,
        message: _message
      });
    });
}

function addMatchToList(req, res, next) {
    const weeklyMatchInfo = req.body;
    var _resStatus = 200;
    var _error = false;
    var _message = null;
    var weeklyMatchId;

    connection.query(
      queries.addMatchToList,
      [
        weeklyMatchInfo.createdAt,
        weeklyMatchInfo.createdBy,
        weeklyMatchInfo.updatedAt,
        weeklyMatchInfo.updatedBy,
        weeklyMatchInfo.weeklyMatchProgramId,
        weeklyMatchInfo.matchId,
        weeklyMatchInfo.matchNo,
        weeklyMatchInfo.isInList,
      ],
      (error, result) => {
        if (!error) {
          weeklyMatchInfo.id = result.insertId;
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

        const _weeklyMatchInfo = crypto.encryptData(weeklyMatchInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _weeklyMatchInfo,
        });
      }
    );
}

function updateWeeklyMatchList(req, res, next) {
    const weeklyMatchInfo = req.body;
    var weeklyMatchId = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.updateWeeklyMatchList,
      [
        weeklyMatchInfo.createdAt,
        weeklyMatchInfo.createdBy,
        weeklyMatchInfo.updatedAt,
        weeklyMatchInfo.updatedBy,
        weeklyMatchInfo.weeklyMatchProgramId,
        weeklyMatchInfo.matchId,
        weeklyMatchInfo.matchNo,
        weeklyMatchInfo.isInList,
        weeklyMatchId || weeklyMatchInfo.id,
        weeklyMatchInfo.weeklyMatchProgramId,
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

        const _weeklyMatchInfo = crypto.encryptData(weeklyMatchInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _weeklyMatchInfo,
        });
      }
    );
}

function clearWeeklyMatchList(req, res, next) {
    var weeklyMatchProgramId = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.clearWeeklyMatchList,
      [weeklyMatchProgramId],
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

function deleteMatchFromList(req, res, next) {
    var weeklyMatchListId = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.deleteMatchFromList,
      [weeklyMatchListId],
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

exports.getWeeklyMatchList = getWeeklyMatchList;
exports.addMatchToList = addMatchToList;
exports.createWeeklyMatchList = createWeeklyMatchList;
exports.updateWeeklyMatchList = updateWeeklyMatchList;
exports.clearWeeklyMatchList = clearWeeklyMatchList;
exports.deleteMatchFromList = deleteMatchFromList;
