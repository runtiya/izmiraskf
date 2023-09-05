const queries = require("../../queries/application/leagues");
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

  connection.query(
    queries.getLeagues,
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
    }
  );
}

exports.getLeagues = getLeagues;
