const queries = require("../../queries/application/teamsingroupstages");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getTeamsInGroupstages(req, res, next) {
  try {
    const groupstageId = req.params.groupstageId;
    var teamsingroupstagesList = [];
    var message;

    connection.query(
      queries.getTeamsInGroupstages,
      [groupstageId],
      (error, result) => {
        if (!error) {
          teamsingroupstagesList = result;
        } else {
          message = error.sqlMessage;
        }

        const _teamsingroupstagesList = crypto.encryptData(teamsingroupstagesList);

        res.status(200).json({
          data: _teamsingroupstagesList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function getTeamsForGroupstages(req, res, next) {
  try {
    var teamsList = [];
    var message;
    connection.query(
      queries.getTeamsForGroupstages,
      (error, result) => {
        if (!error) {
          teamsList = result;
        } else {
          message = error.sqlMessage;
        }

        const _teamsList = crypto.encryptData(teamsList);

        res.status(200).json({
          data: _teamsList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getTeamsInGroupstages = getTeamsInGroupstages;
exports.getTeamsForGroupstages = getTeamsForGroupstages;
