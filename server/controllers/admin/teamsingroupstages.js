const { async } = require('rxjs');

const connection = require('../../functions/database').connectDatabase();

function getTeamsInGroupstages(req, res, next) {
  const groupstageId = req.params.groupstageId;
  var teamsingroupstagesList;
  var message;

  connection.query(
    "select * from view_admin_teamsingroupstages where groupstageId = ?",
    [groupstageId],
    (error, result) => {
      if (!error) {
        teamsingroupstagesList = result;
      } else {
        message = error.sqlMessage;
        teamsingroupstagesList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Teams fetched successfully!',
        teamsingroupstagesList: teamsingroupstagesList
      });
    });
}

function getTeamsForGroupstages(req, res, next) {
  var teamsList;
  var message;
  connection.query(
    "select * from view_admin_teamsforgroupstages",
    (error, result) => {
      if (!error) {
        teamsList = result;
      } else {
        message = error.sqlMessage;
        teamsList = [];
      }
      res.status(200).json({
        error: !!error,
        message: message || 'Teams List fetched successfully!',
        teamsList: teamsList
      });
    }
  )
}

function createTeamsInGroupstages(req, res, next) {
  const groupstageId = req.params.groupstageId;
  var teamsList = req.body;
  var message;
  var error = false;

  async function buildGroups() {
    try {
      await connection.query(
        "delete from teamsingroupstages where groupstageId = ?",
        [groupstageId],
        (error, result) => {
          if (!error) {
            null;
          } else {
            throw error;
          }
        }
      );

      for (let i = 0; i < teamsList.length; i++) {
        const team = teamsList[i];
        await connection.query(
          "insert into teamsingroupstages(createdat, createdby, updatedat, updatedby, groupstageId, teamid, isexpelled, isreceded, orderno) values(?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            team.createdAt,
            team.createdBy,
            team.updatedAt,
            team.updatedBy,
            groupstageId || team.groupstageId,
            team.teamId,
            false,
            false,
            team.orderNo
          ],
          (error, result) => {
           if (!error) {
            teamsList[i].id = result.insertId;
           } else {
            throw error;
           }
          }
        );
      }

    } catch (err) {
      connection.rollback(() => {
        error = true;
        message = err.message;
      });
    } finally {
      res.status(200).json({
        error: error,
        message: message,
        teamsList: teamsList
      });
    }
  }

  buildGroups();
}

function updateTeamsForGroupstages(req, res, next) {
  const teamInfo = req.body;
  var message;

  connection.query(
    "update teamsingroupstages set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, isexpelled = ?, isreceded = ?, weekofexpelledorreceded = ?, explanation = ? where id = ?",
    [
      teamInfo.createdAt,
      teamInfo.createdBy,
      teamInfo.updatedAt,
      teamInfo.updatedBy,
      teamInfo.isExpelled,
      teamInfo.isReceded,
      teamInfo.weekofExpelledorReceded,
      teamInfo.explanation,
      teamInfo.id
    ],
    (error, result) => {
      if (error) {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message
      });
    }
  )

}


function deleteTeamsInGroupstages(req, res, next) {
  const groupstageId = req.params.groupstageId;
  var message;

  connection.query(
    "delete from teamsingroupstages where groupstageId = ?",
    [groupstageId],
    (error, result) => {
      if (!error) {

      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Teams deleted successfully!'
      });
    });
}

exports.getTeamsInGroupstages = getTeamsInGroupstages;
exports.getTeamsForGroupstages = getTeamsForGroupstages
exports.createTeamsInGroupstages = createTeamsInGroupstages;
exports.updateTeamsForGroupstages = updateTeamsForGroupstages;
exports.deleteTeamsInGroupstages = deleteTeamsInGroupstages;
