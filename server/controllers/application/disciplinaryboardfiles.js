const queries = require("../../queries/application/disciplinaryboardfiles");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getDisciplinaryBoardFiles(req, res, next) {
  var disciplinaryBoardFileList = [];
  const seasonId = req.params.seasonid;
  const caseType = req.params.casetype;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getDisciplinaryBoardFiles,
    [seasonId, caseType],
    (error, result) => {
      if (!error) {
        disciplinaryBoardFileList = result;
      } else {
        errorService.handleError(
          errorService.errors.DATABASE_ERROR.code,
          errorService.errors.DATABASE_ERROR.message,
          error.sqlMessage
        );

        _error = true;
        _resStatus = errorService.errors.DATABASE_ERROR.code;
        _message = errorService.errors.DATABASE_ERROR.message;
      }

      const _disciplinaryBoardFileList = crypto.encryptData(disciplinaryBoardFileList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _disciplinaryBoardFileList,
      });
    }
  );
}

exports.getDisciplinaryBoardFiles = getDisciplinaryBoardFiles;
