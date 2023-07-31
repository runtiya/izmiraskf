const connection = require("../../functions/database").connectDatabase();

function getTeams(req, res, next) {
  try {
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
          teamList: teamList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function getTeamById(req, res, next) {
  try {
    var team;
    var teamId = req.params.id;
    var message;

    connection.query(
      "select * from view_application_teams where id = ?",
      [teamId],
      (error, result) => {
        if (!error) {
          team = result[0];
        } else {
          message = error.sqlMessage;
        }

        res.status(200).json({
          team: team,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getTeams = getTeams;
exports.getTeamById = getTeamById;
