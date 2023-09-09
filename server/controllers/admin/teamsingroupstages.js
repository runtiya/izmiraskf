const queries = require("../../queries/admin/teamsingroupstages");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
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
  });
}

function createTeamsInGroupstages(req, res, next) {
  const groupstageId = req.params.groupstageId;
  var teamsList = req.body;
  var _resStatus = 200;
  var _error = false;
  var _message = null;
  var _teamsList;

  connection.query(
    queries.clearTeamsInGroupstages,
    [groupstageId],
    (error, result) => {
      if (!error) {
        const _promises = teamsList.map((team) => {
          return new Promise(async (resolve, reject) => {
            connection.query(
              queries.createTeamsInGroupstages,
              [
                team.createdAt,
                team.createdBy,
                team.updatedAt,
                team.updatedBy,
                groupstageId || team.groupstageId,
                team.teamId,
                false,
                false,
                team.orderNo,
              ],
              (error, result) => {
                if (!error) {
                  team.id = result.insertId;
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
            _teamsList = crypto.encryptData(teamsList);
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
              message: _message,
              data: _teamsList
            });
          });
      } else {
        _error = true;
        _resStatus = errorService.errors.DATABASE_ERROR.code;
        _message = errorService.errors.DATABASE_ERROR.message;

        res.status(_resStatus).json({
          error: _error,
          message: _message
        });
      }
    }
  );
}

function updateTeamsForGroupstages(req, res, next) {
  const teamInfo = req.body;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.updateTeamsForGroupstages,
    [
      teamInfo.createdAt,
      teamInfo.createdBy,
      teamInfo.updatedAt,
      teamInfo.updatedBy,
      teamInfo.isExpelled,
      teamInfo.isReceded,
      teamInfo.weekofExpelledorReceded,
      teamInfo.explanation,
      teamInfo.id,
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

      const _teamInfo = crypto.encryptData(teamInfo);

      res.status(_resStatus).json({
        errro: _error,
        message: _message,
        data: _teamInfo,
      });

    }
  );
}


exports.getTeamsInGroupstages = getTeamsInGroupstages;
exports.getTeamsForGroupstages = getTeamsForGroupstages;
exports.createTeamsInGroupstages = createTeamsInGroupstages;
exports.updateTeamsForGroupstages = updateTeamsForGroupstages;
