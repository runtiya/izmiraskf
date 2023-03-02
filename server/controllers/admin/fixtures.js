const connection = require('../../functions/database').connectDatabase();

function getFixture(req, res, next) {
  const groupstageId = req.params.groupstageId;
  var fixtureList;
  var message;

  connection.query(
    "select * from view_fixtures where groupstageId = ?",
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

function createFixture(req, res, next) {
  var fixtureList = req.body;
  const groupstageId = req.params.groupstageId;
  var message;
  var error = false;

  try {
    connection.query(
      "delete from fixtures where groupstageid = ?",
      [groupstageId],
      (error, result) => {
        if (!error) {
          console.log("Fixtures Deleted!");
          for (let i = 0; i < fixtureList.length; i++) {
            const match = fixtureList[i];
            connection.query(
              "insert into fixtures(groupstageid, matchno, matchweek, matchdate, matchstatus, stadiumid, hometeamid, hometeamscore, ishometeamwinbyforfeit, hometeampoint, awayteamid, awayteamscore, isawayteamwinbyforfeit, awayteampoint, explanation, orderno) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
              [
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
                  fixtureList[i].id = result.insertId;
                } else {
                  throw error;
                }
              }
            );
          }
        } else {
          throw error;
        }
      }
    );
  } catch (err) {
    console.log(err);
    connection.rollback(() => {
      error = true;
      message = err.message;
    });
  } finally {
    res.status(200).json({
      error: false,
      message: message || 'Fixture created successfully!',
      fixtureList: fixtureList
    });
  }
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
exports.createFixture = createFixture;

exports.clearFixture = clearFixture;
