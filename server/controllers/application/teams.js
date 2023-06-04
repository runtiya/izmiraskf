const connection = require('../../functions/database').connectDatabase();

function getTeams(req, res, next) {
  var teamList;
  var message;

  connection.query(
    "select * from view_application_teams",
    (error, result) => {
      if (!error) {
        teamList = result;
      } else {
        message = error.sqlMessage;
        teamList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Teams fetched successfully!',
        teamList: teamList
      });
    });
}

exports.getTeams = getTeams;