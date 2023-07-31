const { async } = require("rxjs");

const connection = require("../../functions/database").connectDatabase();

function getTeamsInGroupstages(req, res, next) {
  try {
    const groupstageId = req.params.groupstageId;
    var teamsingroupstagesList;
    var message;

    connection.query(
      "select * from view_application_teamsingroupstages where groupstageId = ?",
      [groupstageId],
      (error, result) => {
        if (!error) {
          teamsingroupstagesList = result;
        } else {
          message = error.sqlMessage;
          teamsingroupstagesList = [];
        }

        res.status(200).json({
          teamsingroupstagesList: teamsingroupstagesList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function getTeamsForGroupstages(req, res, next) {
  try {
    var teamsList;
    var message;
    connection.query(
      "select * from view_application_teamsforgroupstages",
      (error, result) => {
        if (!error) {
          teamsList = result;
        } else {
          message = error.sqlMessage;
          teamsList = [];
        }
        res.status(200).json({
          teamsList: teamsList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getTeamsInGroupstages = getTeamsInGroupstages;
exports.getTeamsForGroupstages = getTeamsForGroupstages;
