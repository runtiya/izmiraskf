const queries = require("../../queries/application/stadiums");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getStadiums(req, res, next) {
  (async () => {
    var stadiumsList = [];
    var stadiumsCount = 0;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    const paginationPageSize = +req.query.paginationPageSize;
    const paginationCurrentPage = +req.query.paginationCurrentPage;

    stadiumsList = await new Promise((resolve, reject) => {
      connection.query(
        queries.getStadiums,
        [
          paginationPageSize,
          (paginationCurrentPage - 1) * paginationPageSize
        ],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            errorService.handleError(
              errorService.errors.DATABASE_ERROR.code,
              errorService.errors.DATABASE_ERROR.message,
              error.sqlMessage
            );

            _error = true;
            _resStatus = errorService.errors.DATABASE_ERROR.code;
            _message = errorService.errors.DATABASE_ERROR.message;

            resolve(error.sqlMessage);
          }
        });
    });

    stadiumsCount = await new Promise((resolve, reject) => {
      connection.query(
        "select count(1) as 'count' from view_application_stadiums",
        (error,result) => {
          if(!error){
            resolve(result[0].count);
          }else{
            errorService.handleError(
              errorService.errors.DATABASE_ERROR.code,
              errorService.errors.DATABASE_ERROR.message,
              error.sqlMessage
            );

            _error = true;
            _resStatus = errorService.errors.DATABASE_ERROR.code;
            _message = errorService.errors.DATABASE_ERROR.message;

            resolve(error.sqlMessage);
          }
        }
      );
    });

    const _stadiumsList = crypto.encryptData({stadiumsList: stadiumsList, stadiumsCount: stadiumsCount});

    res.status(_resStatus).json({
      error: _error,
      message: _message,
      data: _stadiumsList,
    });
})();
}

function getStadiumById(req, res, next) {
  var stadium;
  var stadiumId = req.params.id;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getStadiumById,
    [stadiumId],
    (error, result) => {
      if (!error) {
        stadium = result[0];
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

      const _stadium = crypto.encryptData(stadium);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _stadium,
      });
    }
  );
}

exports.getStadiums = getStadiums;
exports.getStadiumById = getStadiumById;
