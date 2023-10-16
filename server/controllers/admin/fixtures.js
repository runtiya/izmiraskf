const queries = require("../../queries/admin/fixtures");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');


function getFixtureBySearchIndex(req, res, next) {
    const searchIndex = req.body;
    var fixtureList = [];
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    console.log(searchIndex)

    let seasonSearchIndex = searchIndex.seasonId
      ? "seasonId = " + searchIndex.seasonId
      : "true";
    let leagueSearchIndex = searchIndex.leagueId
      ? "leagueId = " + searchIndex.leagueId
      : "true";
    let groupstageSearchIndex = searchIndex.groupstageId
      ? "groupstageId = " + searchIndex.groupstageId
      : "true";
    let matchWeekSearchIndex = searchIndex.matchWeek
      ? "matchweek = " + searchIndex.matchWeek
      : "true";
    let matchNoSearchIndex = searchIndex.matchNo
      ? "matchNo = " + JSON.stringify(searchIndex.matchNo)
      : "true";
    let stadiumIdSearchIndex = searchIndex.stadiumId
      ? "stadiumId = " + searchIndex.stadiumId
      : "true";
    let homeTeamIdSearchIndex = searchIndex.homeTeamId
      ? "homeTeamId = " + searchIndex.homeTeamId
      : "true";
    let awayTeamIdSearchIndex = searchIndex.awayTeamId
      ? "awayTeamId = " + searchIndex.awayTeamId
      : "true";
    let matchStatusSearchIndex = searchIndex.matchStatus
      ? "matchStatus = " + JSON.stringify(searchIndex.matchStatus)
      : "true";
    let townSearchIndex = searchIndex.town
      ? "town = " + JSON.stringify(searchIndex.town)
      : "true";
    let startDateSearchIndex = searchIndex.startDate
      ? "matchDate > " + JSON.stringify(searchIndex.startDate + " 00:00")
      : "true";
    let endDateSearchIndex = searchIndex.endDate
      ? "matchDate < " + JSON.stringify(searchIndex.endDate + " 23:59")
      : "true";
    let weeklyMatchProgramIndex = searchIndex.weeklyMatchProgramId
      ? "matchno in (select matchno from VIEW_ADMIN_WEEKLYMATCHLIST where weeklymatchprogramid = " +
        searchIndex.weeklyMatchProgramId +
        ")"
      : "true";

    connection.query(
      "select * from VIEW_ADMIN_FIXTURES where " +
        seasonSearchIndex +
        " and " +
        leagueSearchIndex +
        " and " +
        groupstageSearchIndex +
        " and " +
        matchWeekSearchIndex +
        " and " +
        matchNoSearchIndex +
        " and " +
        stadiumIdSearchIndex +
        " and " +
        homeTeamIdSearchIndex +
        " and " +
        awayTeamIdSearchIndex +
        " and " +
        matchStatusSearchIndex +
        " and " +
        townSearchIndex +
        " and " +
        startDateSearchIndex +
        " and " +
        endDateSearchIndex +
        " and " +
        weeklyMatchProgramIndex +
        " and true ",
      (error, result) => {
        if (!error) {
          fixtureList = result;
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

        const _fixtureList = crypto.encryptData(fixtureList);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _fixtureList,
        });
      }
    );
}

function createFixture(req, res, next) {
  var _matchList = req.body;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  const _promises = _matchList.map((match) => {
    return new Promise(async (resolve, reject) => {
      connection.query(
        queries.createFixture,
        [
          match.createdAt,
          match.createdBy,
          match.updatedAt,
          match.updatedBy,
          match.groupstageId,
          match.matchNo,
          match.matchWeek,
          match.matchDate,
          match.matchStatus,
          match.stadiumId,
          match.homeTeamId,
          match.homeTeamScore,
          match.isHomeTeamWinByForfeit,
          match.homeTeamPoint,
          match.awayTeamId,
          match.awayTeamScore,
          match.isAwayTeamWinByForfeit,
          match.awayTeamPoint,
          match.explanation,
          match.orderNo,
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

function updateFixture(req, res, next) {
  var _fixtureList = req.body;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  const _promises = _fixtureList.map((match) => {
    return new Promise(async (resolve, reject) => {
      connection.query(
        queries.updateFixture,
        [
          match.createdAt,
          match.createdBy,
          match.updatedAt,
          match.updatedBy,
          match.groupstageId,
          match.matchNo,
          match.matchWeek,
          match.matchDate,
          match.matchStatus,
          match.stadiumId,
          match.homeTeamId,
          match.homeTeamScore,
          match.isHomeTeamWinByForfeit,
          match.homeTeamPoint,
          match.awayTeamId,
          match.awayTeamScore,
          match.isAwayTeamWinByForfeit,
          match.awayTeamPoint,
          match.explanation,
          match.orderNo,
          match.id
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
    })

}


function deleteMatch(req, res, next) {
    const id = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.deleteMatch,
      [
        id
      ],
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
    });
}

function clearFixture(req, res, next) {
    const groupstageId = req.params.groupstageid;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.clearFixture,
      [groupstageId],
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
    });
}

exports.getFixtureBySearchIndex = getFixtureBySearchIndex;
exports.createFixture = createFixture;
exports.updateFixture = updateFixture;
exports.deleteMatch = deleteMatch;
exports.clearFixture = clearFixture;
