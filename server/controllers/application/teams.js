const queries = require("../../queries/application/teams");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');


const util = require('util');
const queryAsync = util.promisify(connection.query).bind(connection);


function getTeams(req, res, next) {
  (async () => {
    try {
      var teamsList = [];
      var teamsCount = 0;
      var message;
      const paginationPageSize = +req.query.paginationPageSize;
      const paginationCurrentPage = +req.query.paginationCurrentPage;


      teamsList = await new Promise((resolve, reject) => {
        connection.query(
          queries.getTeams,
          [
            paginationPageSize,
            (paginationCurrentPage - 1) * paginationPageSize
          ],
          (error, result) => {
            if (!error) {
              resolve(result);
            } else {
              reject(error.sqlMessage);
            }
          }
        );
      });

      teamsCount = await new Promise((resolve, reject) => {
        connection.query(
          "select count(1) as 'count' from view_application_teams",
          (error, result) => {
            if (!error) {
              resolve(result[0].count);
            } else {
              reject(error.sqlMessage);
            }
          }
        );
      });


      const _data = crypto.encryptData({ teamsList: teamsList, teamsCount: teamsCount });

      res.status(200).json({
        data: _data
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error
      });

    }
  })();

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
