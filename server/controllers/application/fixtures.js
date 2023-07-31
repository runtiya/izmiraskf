const connection = require("../../functions/database").connectDatabase();

function getFixtureBySearchIndex(req, res, next) {
  try {
    const searchIndex = req.body;
    var fixtureList;
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
    let weeklyMatchProgramSearchIndex = searchIndex.weeklyMatchProgramIds
      ? `matchno in (select matchno from view_application_weeklymatchlist where weeklymatchprogramid in (${searchIndex.weeklyMatchProgramIds
          .map((item) => `${item}`)
          .join(", ")}))`
      : "true";

    connection.query(
      "select * from view_application_fixtures where " +
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
        weeklyMatchProgramSearchIndex +
        " and true",
      (error, result) => {
        if (!error) {
          fixtureList = result;
        } else {
          message = error.sqlMessage;
          fixtureList = [];
        }

        res.status(200).json({
          fixtureList: fixtureList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getFixtureBySearchIndex = getFixtureBySearchIndex;
