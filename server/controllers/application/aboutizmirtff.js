const queries = require("../../queries/application/aboutizmirtff");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getAboutContent(req, res, next) {
  var aboutContent = null;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getAboutContent,
    (error, result) => {
      if (!error) {
        aboutContent = result[0];
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

      const _aboutContent = crypto.encryptData(aboutContent);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _aboutContent,
      });
    }
  );
}

exports.getAboutContent = getAboutContent;
