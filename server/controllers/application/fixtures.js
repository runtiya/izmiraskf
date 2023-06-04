const connection = require('../../functions/database').connectDatabase();

function getFixture(req, res, next) {
  const groupstageId = req.params.groupstageid;
  var fixtureList;
  var message;

  connection.query(
    "select * from view_application_fixtures where groupstageId = ?",
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
  let matchNoSearchIndex = searchIndex.matchNo ? "matchNo = " + JSON.stringify(searchIndex.matchNo) : "true";
  let stadiumIdSearchIndex = searchIndex.stadiumId ? "stadiumId = " + searchIndex.stadiumId : "true";
  let homeTeamIdSearchIndex = searchIndex.homeTeamId ? "homeTeamId = " + searchIndex.homeTeamId : "true";
  let awayTeamIdSearchIndex = searchIndex.awayTeamId ? "awayTeamId = " + searchIndex.awayTeamId : "true";
  let matchStatusSearchIndex = searchIndex.matchStatus ? "matchStatus = " + JSON.stringify(searchIndex.matchStatus) : "true";
  let townSearchIndex = searchIndex.town ? "town = " + JSON.stringify(searchIndex.town) : "true";
  let startDateSearchIndex = searchIndex.startDate ? "matchDate > " + JSON.stringify(searchIndex.startDate + " 00:00") : "true";
  let endDateSearchIndex = searchIndex.endDate ? "matchDate < " + JSON.stringify(searchIndex.endDate + " 23:59") : "true";


  connection.query(
    "select * from view_application_fixturesforsearch where " + seasonSearchIndex + " and "
                                                              + leagueSearchIndex + " and "
                                                              + groupstageSearchIndex + " and "
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

exports.getFixture = getFixture;
exports.getFixtureBySearchIndex = getFixtureBySearchIndex;

