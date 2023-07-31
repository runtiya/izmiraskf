const connection = require("../../functions/database").connectDatabase();

function getDisciplinaryBoardFiles(req, res, next) {
  try {
    var disciplinaryBoardFileList;
    var message;
    const seasonId = req.params.seasonid;
    const caseType = req.params.casetype;

    connection.query(
      "select * from view_application_disciplinaryboardfiles where seasonid = ? and casetype = ?",
      [seasonId, caseType],
      (error, result) => {
        if (!error) {
          disciplinaryBoardFileList = result;
        } else {
          disciplinaryBoardFileList = [];
          message = error.sqlMessage;
        }

        res.status(200).json({
          disciplinaryBoardFileList: disciplinaryBoardFileList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getDisciplinaryBoardFiles = getDisciplinaryBoardFiles;
