const connection = require('../../functions/database').connectDatabase();

function getGoalByLeague(req, res, next) {
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
        error: !!error,
        message: message || 'Goal By League fetched successfully!',
        goalByLeagueList: goalByLeagueList
      });
    }
  );
}


exports.getGoalByLeague = getGoalByLeague;
