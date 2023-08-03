const queries = require('../../queries/admin/disciplinaryboarddecisions');
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getDisciplinaryBoardDecisions(req, res, next) {
  try {
    var disciplinaryBoardDecisionList = [];
    var message;
    const disciplinaryBoardFileId = req.params.fileid;

    connection.query(
      queries.getDisciplinaryBoardDecisions,
      [disciplinaryBoardFileId],
      (error, result) => {
        if (!error) {
          disciplinaryBoardDecisionList = result;
        } else {
          message = error.sqlMessage;
        }

        const _disciplinaryBoardDecisionList = crypto.encryptData(disciplinaryBoardDecisionList);

        res.status(200).json({
          data: _disciplinaryBoardDecisionList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function createDisciplinaryBoardDecision(req, res, next) {
  try {
    const disciplinaryBoardDecisionInfo = req.body;
    var message;
    var disciplinaryBoardDecisionId;

    connection.query(
      queries.createDisciplinaryBoardDecision,
      [
        disciplinaryBoardDecisionInfo.createdAt,
        disciplinaryBoardDecisionInfo.createdBy,
        disciplinaryBoardDecisionInfo.updatedAt,
        disciplinaryBoardDecisionInfo.updatedBy,
        disciplinaryBoardDecisionInfo.disciplinaryBoardFileId,
        disciplinaryBoardDecisionInfo.leagueId,
        disciplinaryBoardDecisionInfo.teamId,
        disciplinaryBoardDecisionInfo.fullName,
        disciplinaryBoardDecisionInfo.licenseNo,
        disciplinaryBoardDecisionInfo.belongingTo,
        disciplinaryBoardDecisionInfo.penalType,
        disciplinaryBoardDecisionInfo.duration,
        disciplinaryBoardDecisionInfo.explanation,
      ],
      (error, result) => {
        if (!error) {
          disciplinaryBoardDecisionId = result.insertId;
        } else {
          message = error.sqlMessage;
        }

        const _disciplinaryBoardDecisionId = crypto.encryptData(disciplinaryBoardDecisionId);

        res.status(200).json({
          data: _disciplinaryBoardDecisionId,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function updateDisciplinaryBoardDecision(req, res, next) {
  try {
    const disciplinaryBoardDecisionInfo = req.body;
    var message;

    connection.query(
      queries.updateDisciplinaryBoardDecision,
      [
        disciplinaryBoardDecisionInfo.createdAt,
        disciplinaryBoardDecisionInfo.createdBy,
        disciplinaryBoardDecisionInfo.updatedAt,
        disciplinaryBoardDecisionInfo.updatedBy,
        disciplinaryBoardDecisionInfo.disciplinaryBoardFileId,
        disciplinaryBoardDecisionInfo.leagueId,
        disciplinaryBoardDecisionInfo.teamId,
        disciplinaryBoardDecisionInfo.fullName,
        disciplinaryBoardDecisionInfo.licenseNo,
        disciplinaryBoardDecisionInfo.belongingTo,
        disciplinaryBoardDecisionInfo.penalType,
        disciplinaryBoardDecisionInfo.duration,
        disciplinaryBoardDecisionInfo.explanation,
        disciplinaryBoardDecisionInfo.id,
      ],
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

function deleteDisciplinaryBoardDecision(req, res, next) {
  try {
    var disciplinaryBoardDecisionId = req.params.id;
    var message;

    connection.query(
      queries.deleteDisciplinaryBoardDecision,
      [disciplinaryBoardDecisionId],
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

function clearDisciplinaryBoardDecisions(req, res, next) {
  try {
    var disciplinaryBoardFileId = req.params.fileid;
    var message;

    connection.query(
      queries.clearDisciplinaryBoardDecisions,
      [disciplinaryBoardFileId],
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

exports.getDisciplinaryBoardDecisions = getDisciplinaryBoardDecisions;
exports.createDisciplinaryBoardDecision = createDisciplinaryBoardDecision;
exports.updateDisciplinaryBoardDecision = updateDisciplinaryBoardDecision;
exports.deleteDisciplinaryBoardDecision = deleteDisciplinaryBoardDecision;
exports.clearDisciplinaryBoardDecisions = clearDisciplinaryBoardDecisions;
