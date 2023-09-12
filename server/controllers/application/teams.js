const queries = require("../../queries/application/teams");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');


function getTeams(req, res, next) {
  var teamsList = [];
  var teamsCount = 0;
  const paginationPageSize = +req.query.paginationPageSize;
  const paginationCurrentPage = +req.query.paginationCurrentPage;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  const teamsListPromise = new Promise(async (resolve, reject) => {
    connection.query(
      (!!paginationPageSize && !!paginationCurrentPage) ? queries.getTeamsWithPagination : queries.getTeams,
      [
        paginationPageSize,
        (paginationCurrentPage - 1) * paginationPageSize
      ],
      (error, result) => {
        if (!error) {
          teamsList = result;
          resolve();
        } else {
          reject(error);
        }
      }
    );
  });

  const teamsCountPromise = new Promise(async (resolve, reject) => {
    connection.query(
      queries.getTeamsCount,
      (error, result) => {
        if (!error) {
          teamsCount = result[0].count;
          resolve();
        } else {
          reject(error);
        }
      }
    );
  });


  Promise.all([teamsListPromise, teamsCountPromise])
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
      const _teamsList = crypto.encryptData({ teamsList: teamsList, teamsCount: teamsCount });

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _teamsList
      });
    });
}

function getTeamById(req, res, next) {
  var team;
  var teamId = req.params.id;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getTeamById,
    [teamId],
    (error, result) => {
      if (!error) {
        team = result[0];
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

      const _team = crypto.encryptData(team);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _team,
      });
    }
  );
}

exports.getTeams = getTeams;
exports.getTeamById = getTeamById;
