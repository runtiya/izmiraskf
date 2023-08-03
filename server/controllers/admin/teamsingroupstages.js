const queries = require("../../queries/admin/teamsingroupstages");
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
    connection.query(queries.getTeamsForGroupstages, (error, result) => {
      if (!error) {
        teamsList = result;
      } else {
        message = error.sqlMessage;
      }

      const _teamsList = crypto.encryptData(teamsList);

      res.status(200).json({
        data: _teamsList,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function createTeamsInGroupstages(req, res, next) {
  const groupstageId = req.params.groupstageId;
  var teamsList = req.body;
  var message;
  var error = false;

  async function buildGroups() {
    try {
      await connection.query(
        queries.createTeamsInGroupstagesBeforeInsert,
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
          queries.createTeamsInGroupstages,
          [
            team.createdAt,
            team.createdBy,
            team.updatedAt,
            team.updatedBy,
            groupstageId || team.groupstageId,
            team.teamId,
            false,
            false,
            team.orderNo,
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

      });
    } finally {
      const _teamsList = crypto.encryptData(teamsList);
      res.status(200).json({
        data: _teamsList,
      });
    }
  }

  buildGroups();
}

function updateTeamsForGroupstages(req, res, next) {
  try {
    const teamInfo = req.body;
    var message;

    connection.query(
      queries.updateTeamsForGroupstages,
      [
        teamInfo.createdAt,
        teamInfo.createdBy,
        teamInfo.updatedAt,
        teamInfo.updatedBy,
        teamInfo.isExpelled,
        teamInfo.isReceded,
        teamInfo.weekofExpelledorReceded,
        teamInfo.explanation,
        teamInfo.id,
      ],
      (error, result) => {
        if (error) {
          message = error.sqlMessage;
        }

        res.status(200).json({

        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function deleteTeamsInGroupstages(req, res, next) {
  try {
    const groupstageId = req.params.groupstageId;
    var message;

    connection.query(
      queries,
      deleteTeamsInGroupstages[groupstageId],
      (error, result) => {
        if (!error) {
        } else {
          message = error.sqlMessage;
        }

        res.status(200).json({

        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getTeamsInGroupstages = getTeamsInGroupstages;
exports.getTeamsForGroupstages = getTeamsForGroupstages;
exports.createTeamsInGroupstages = createTeamsInGroupstages;
exports.updateTeamsForGroupstages = updateTeamsForGroupstages;
exports.deleteTeamsInGroupstages = deleteTeamsInGroupstages;
