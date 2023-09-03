const queries = require("../../queries/application/externallinks");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

// Get all external links list
function getExternalLinks(req, res, next) {
  var extlinkList = [];
  const linkType = req.params.linktype;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getExternalLinks,
    [linkType],
    (error, result) => {
      if (!error) {
        extlinkList = result;
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

      const _extlinkList = crypto.encryptData(extlinkList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _extlinkList,
      });
    }
  );
}

exports.getExternalLinks = getExternalLinks;
