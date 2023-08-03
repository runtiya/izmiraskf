const queries = require("../../queries/application/disciplinaryboarddecisions");
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

exports.getDisciplinaryBoardDecisions = getDisciplinaryBoardDecisions;
