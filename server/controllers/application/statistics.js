const connection = require("../../functions/database").connectDatabase();

function getGoalByLeague(req, res, next) {
  try {
    var goalByLeagueList;
    var message;

    connection.query(
      "select * from view_application_statistics_goalbyleague",
      (error, result) => {
        if (!error) {
          goalByLeagueList = result;
        } else {
          message = error.sqlMessage;
          goalByLeagueList = [];
        }

        res.status(200).json({
          goalByLeagueList: goalByLeagueList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getGoalByLeague = getGoalByLeague;
