const queries = require("../../queries/application/documents");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getDocuments(req, res, next) {
  const fileCategory = req.params.filecategory;
  var documentsList = [];
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getDocuments,
    [fileCategory],
    (error, result) => {
      if (!error) {
        documentsList = result;
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

      const _documentsList = crypto.encryptData(documentsList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _documentsList,
      });
    }
  );
}

exports.getDocuments = getDocuments;
