const queries = require("../../queries/admin/fixtures");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getFixtureBySearchIndex(req, res, next) {
  try {
    const searchIndex = req.body;
    var fixtureList = [];
    var message;

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
      ? "matchno in (select matchno from view_admin_weeklymatchlist where weeklymatchprogramid = " +
        searchIndex.weeklyMatchProgramId +
        ")"
      : "true";
    // Select query should be include parameters. __MS
    connection.query(
      "select * from view_admin_fixtures where " +
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
          message = error.sqlMessage;
        }

        const _fixtureList = crypto.encryptData(fixtureList);

        res.status(200).json({
          data: _fixtureList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function createFixture(req, res, next) {
  var _matchList = req.body;
  var message;
  var _error = false;

  try {
    for (let m = 0; m < _matchList.length; m++) {
      var match = _matchList[m];
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
            //pass
          } else {
            message = error.sqlMessage;
            console.log(message)
            throw error;
          }
        }
      );
    }
  } catch (_error) {
    connection.rollback(() => {
      _error = true;
    });
  } finally {
    res.status(200).json({

    });
  }
}

function updateFixture(req, res, next) {
  var _fixtureList = req.body;
  var message;
  var _error = false;

  try {
    for (let m = 0; m < _fixtureList.length; m++) {
      var match = _fixtureList[m];
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
            //pass
          } else {
            message = error.message;
            throw error;
          }
        }
      );
    }
  } catch (_error) {
    connection.rollback(() => {
      _error = true;
    });
  } finally {
    res.status(200).json({

    });
  }
}

function deleteMatch(req, res, next) {
  try {
    const id = req.params.id;
    var message;

    connection.query(queries.deleteMatch, [id], (error, result) => {
      if (error) {
        message = error.sqlMessage;
      }

      res.status(200).json({

      });
    });
  } catch (error) {
    console.log(error);
  }
}

function clearFixture(req, res, next) {
  try {
    const groupstageId = req.params.groupstageid;
    var message;

    connection.query(queries.clearFixture, [groupstageId], (error, result) => {
      if (error) {
        var message = error.sqlMessage;
      } else {
        // pass
      }

      res.status(200).json({

      });
    });
  } catch (error) {
    console.log(error);
  }
}

exports.getFixtureBySearchIndex = getFixtureBySearchIndex;
exports.createFixture = createFixture;
exports.updateFixture = updateFixture;
exports.deleteMatch = deleteMatch;
exports.clearFixture = clearFixture;
