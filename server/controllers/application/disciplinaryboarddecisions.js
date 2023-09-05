const queries = require("../../queries/application/disciplinaryboarddecisions");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getDisciplinaryBoardDecisions(req, res, next) {
  var disciplinaryBoardDecisionList = [];
  const disciplinaryBoardFileId = req.params.fileid;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getDisciplinaryBoardDecisions,
    [disciplinaryBoardFileId],
    (error, result) => {
      if (!error) {
        disciplinaryBoardDecisionList = result;
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

      const _disciplinaryBoardDecisionList = crypto.encryptData(disciplinaryBoardDecisionList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _disciplinaryBoardDecisionList,
      });
    }
  );
}

exports.getDisciplinaryBoardDecisions = getDisciplinaryBoardDecisions;
