const connection = require('../../functions/database').connectDatabase();

function getFixture(req, res, next) {
  const groupstageId = req.params.groupstageid;
  var fixtureList;
  var message;

  connection.query(
    "select * from view_admin_fixtures where groupstageId = ?",
    [groupstageId],
    (error, result) => {
      if (!error) {
        fixtureList = result;
      } else {
        message = error.sqlMessage;
        fixtureList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Fixtures fetched successfully!',
        fixtureList: fixtureList
      });
    }
  );
}

function getFixtureBySearchIndex(req, res, next) {
  const searchIndex = req.body;
  var fixtureList;
  var message;


  let seasonSearchIndex = searchIndex.seasonId ? "seasonId = " + searchIndex.seasonId : "true";
  let leagueSearchIndex = searchIndex.leagueId ? "leagueId = " + searchIndex.leagueId : "true";
  let groupstageSearchIndex = searchIndex.groupstageId ? "groupstageId = " + searchIndex.groupstageId : "true";
  let matchWeekSearchIndex = searchIndex.matchWeek ? "matchweek = " + searchIndex.matchWeek : "true";
  let matchNoSearchIndex = searchIndex.matchNo ? "matchNo = " + JSON.stringify(searchIndex.matchNo) : "true";
  let stadiumIdSearchIndex = searchIndex.stadiumId ? "stadiumId = " + searchIndex.stadiumId : "true";
  let homeTeamIdSearchIndex = searchIndex.homeTeamId ? "homeTeamId = " + searchIndex.homeTeamId : "true";
  let awayTeamIdSearchIndex = searchIndex.awayTeamId ? "awayTeamId = " + searchIndex.awayTeamId : "true";
  let matchStatusSearchIndex = searchIndex.matchStatus ? "matchStatus = " + JSON.stringify(searchIndex.matchStatus) : "true";
  let townSearchIndex = searchIndex.town ? "town = " + JSON.stringify(searchIndex.town) : "true";
  let startDateSearchIndex = searchIndex.startDate ? "matchDate > " + JSON.stringify(searchIndex.startDate + " 00:00") : "true";
  let endDateSearchIndex = searchIndex.endDate ? "matchDate < " + JSON.stringify(searchIndex.endDate + " 23:59") : "true";


  connection.query(
    "select * from view_admin_fixturesforsearch where " + seasonSearchIndex + " and "
                                                  + leagueSearchIndex + " and "
                                                  + groupstageSearchIndex + " and "
                                                  + matchWeekSearchIndex + " and "
                                                  + matchNoSearchIndex + " and "
                                                  + stadiumIdSearchIndex + " and "
                                                  + homeTeamIdSearchIndex + " and "
                                                  + awayTeamIdSearchIndex + " and "
                                                  + matchStatusSearchIndex + " and "
                                                  + townSearchIndex + " and "
                                                  + startDateSearchIndex + " and "
                                                  + endDateSearchIndex + " and true ",
    (error, result) => {
      if (!error) {
        fixtureList = result;
      } else {
        message = error.sqlMessage;
        fixtureList = [];
      }

      res.status(200).json({
        error: false, //!!error,
        message: message || 'Fixture Search fetched successfully!',
        fixtureList: fixtureList
      });
    }
  );
}

function createFixture(req, res, next) {
  var _fixtureList = req.body;
  var message;
  var _error = false;


  try {
    for (let m = 0; m < _fixtureList.length; m++) {
      var match = _fixtureList[m];
      connection.query(
        "insert into fixtures(createdat, createdby, updatedat, updatedby, groupstageid, matchno, matchweek, matchdate, matchstatus, stadiumid, hometeamid, hometeamscore, ishometeamwinbyforfeit, hometeampoint, awayteamid, awayteamscore, isawayteamwinbyforfeit, awayteampoint, explanation, orderno) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
          match.orderNo
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
      error: _error,
      message: message || 'Fixture created successfully!',
      fixtureList: _fixtureList
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
        "update fixtures set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, groupstageid = ?, matchno = ?, matchweek = ?, matchdate = ?, matchstatus = ?, stadiumid = ?, hometeamid = ?, hometeamscore = ?, ishometeamwinbyforfeit = ?, hometeampoint = ?, awayteamid = ?, awayteamscore = ?, isawayteamwinbyforfeit = ?, awayteampoint = ?, explanation = ?, orderno = ? where id = ?",
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
      error: _error,
      message: message || 'Fixture updated successfully!',
    });
  }
}

function deleteMatch(req, res, next) {
  const id = req.params.id;
  var message;

  connection.query(
    "delete from fixtures where id = ?",
    [id],
    (error, result) => {
      if (error) {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Match deleted successfully!'
      });
    }
  );
}

function clearFixture(req, res, next) {
  const groupstageId = req.params.groupstageid;
  var message;

  connection.query(
    "delete from fixtures where groupstageid = ?",
    [groupstageId],
    (error, result) => {
      if (error) {
        var message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Fixtures deleted successfully!'
      });
    }
  );
}


exports.getFixture = getFixture;
exports.getFixtureBySearchIndex = getFixtureBySearchIndex;
exports.createFixture = createFixture;
exports.updateFixture = updateFixture;
exports.deleteMatch = deleteMatch;
exports.clearFixture = clearFixture;
