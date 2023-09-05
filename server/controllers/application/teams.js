const queries = require("../../queries/application/teams");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

const util = require('util');
const queryAsync = util.promisify(connection.query).bind(connection);


function getTeams(req, res, next) {
  (async () => {
    var teamsList = [];
    var teamsCount = 0;
    const paginationPageSize = +req.query.paginationPageSize;
    const paginationCurrentPage = +req.query.paginationCurrentPage;
    var _resStatus = 200;
    var _error = false;
    var _message = null;


    teamsList = await new Promise((resolve, reject) => {
      connection.query(
        (!!paginationPageSize && !!paginationCurrentPage) ? queries.getTeamsWithPagination : queries.getTeams,
        [
          paginationPageSize,
          (paginationCurrentPage - 1) * paginationPageSize
        ],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            errorService.handleError(
              errorService.errors.DATABASE_ERROR.code,
              errorService.errors.DATABASE_ERROR.message,
              error.sqlMessage
            );

            _error = true;
            _resStatus = errorService.errors.DATABASE_ERROR.code;
            _message = errorService.errors.DATABASE_ERROR.message;
            reject(error.sqlMessage);
          }
        }
      );
    });

    teamsCount = await new Promise((resolve, reject) => {
      connection.query(
        "select count(1) as 'count' from view_application_teams",
        (error, result) => {
          if (!error) {
            resolve(result[0].count);
          } else {
            errorService.handleError(
              errorService.errors.DATABASE_ERROR.code,
              errorService.errors.DATABASE_ERROR.message,
              error.sqlMessage
            );

            _error = true;
            _resStatus = errorService.errors.DATABASE_ERROR.code;
            _message = errorService.errors.DATABASE_ERROR.message;
            reject(error.sqlMessage);
          }
        }
      );
    });

    const _teamsList = crypto.encryptData({ teamsList: teamsList, teamsCount: teamsCount });

    res.status(_resStatus).json({
      error: _error,
      message: _message,
      data: _teamsList
    });
  })();

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
