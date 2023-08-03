const queries = require("../../queries/application/teams");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getTeams(req, res, next) {
  try {
    var teamList = [];
    var message;

    connection.query(
      queries.getTeams,
      (error, result) => {
        if (!error) {
          teamList = result;
        } else {
          message = error.sqlMessage;
          teamList = [];
        }

        const _teamList = crypto.encryptData(teamList);

        res.status(200).json({
          data: _teamList,
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
      queries.getTeamById,
      [teamId],
      (error, result) => {
        if (!error) {
          team = result[0];
        } else {
          message = error.sqlMessage;
        }

        const _team = crypto.encryptData(team);

        res.status(200).json({
          data: _team,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getTeams = getTeams;
exports.getTeamById = getTeamById;
