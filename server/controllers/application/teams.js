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

function getTeamById(req, res, next) {
    var team;
    var teamId = req.params.id;
    var message;
  
    connection.query(
      "select * from view_application_teams where id = ?",
      [
        teamId
      ],
      (error, result) => {
        if (!error) {
          team = result[0];
        } else {
          message = error.sqlMessage;
        }
  
        res.status(200).json({
          error: !!error,
          message: message || 'Teams fetched successfully!',
          team: team
        });
      });
  
  }

exports.getTeams = getTeams;
exports.getTeamById = getTeamById;