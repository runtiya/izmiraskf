const connection = require('../../functions/database').connectDatabase();

function getFixture(req, res, next) {
  const groupstageId = req.params.groupstagesid;
  var fixtureList;
  var message;

  connection.query(
    "select * from view_fixtures where groupstagesid = ?",
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
  const groupstagesId = req.params.groupstageid;
  var message;
  var error = false;

  try {
    connection.query(
      "delete from fixtures where groupstagesid = ?",
      [groupstagesId],
      async (error, result) => {
        if (!error) {
          console.log("Fixtures Deleted!");
          for (let i = 0; i < fixtureList.length; i++) {
            const match = fixtureList[i];
            await connection.query(
              "insert into fixtures(groupstagesid, matchno, matchweek, matchdate, stadiumid, hometeamid, awayteamid, orderno) values (?, ?, ?, ?, ?, ?, ?, ?)",
              [
                match.groupstageId,
                match.matchNo,
                match.matchWeek,
                match.matchDate,
                match.stadiumId,
                match.homeTeamId,
                match.awayTeamId,
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
