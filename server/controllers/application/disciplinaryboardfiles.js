const queries = require("../../queries/application/disciplinaryboardfiles");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getDisciplinaryBoardFiles(req, res, next) {
  try {
    var disciplinaryBoardFileList = [];
    var message;
    const seasonId = req.params.seasonid;
    const caseType = req.params.casetype;

    connection.query(
      queries.getDisciplinaryBoardFiles,
      [seasonId, caseType],
      (error, result) => {
        if (!error) {
          disciplinaryBoardFileList = result;
        } else {
          message = error.sqlMessage;
        }

        const _disciplinaryBoardFileList = crypto.encryptData(disciplinaryBoardFileList);

        res.status(200).json({
          data: _disciplinaryBoardFileList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getDisciplinaryBoardFiles = getDisciplinaryBoardFiles;
