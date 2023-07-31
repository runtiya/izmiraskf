const connection = require("../../functions/database").connectDatabase();

function getDisciplinaryBoardDecisions(req, res, next) {
  try {
    var disciplinaryBoardDecisionList;
    var message;
    const disciplinaryBoardFileId = req.params.fileid;

    connection.query(
      "select * from view_application_disciplinaryboarddecisions where disciplinaryBoardFileId = ?",
      [disciplinaryBoardFileId],
      (error, result) => {
        if (!error) {
          disciplinaryBoardDecisionList = result;
        } else {
          disciplinaryBoardDecisionList = [];
          message = error.sqlMessage;
        }

        res.status(200).json({
          disciplinaryBoardDecisionList: disciplinaryBoardDecisionList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getDisciplinaryBoardDecisions = getDisciplinaryBoardDecisions;
