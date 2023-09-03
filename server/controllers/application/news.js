const queries = require("../../queries/application/news");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getNews(req, res, next) {
  (async () => {
    var newsList = [];
    var newsCount = 0;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    const paginationPageSize = +req.query.paginationPageSize;
    const paginationCurrentPage = +req.query.paginationCurrentPage;

    newsList = await new Promise((resolve,reject) => {
      connection.query(
        queries.getNews,
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
        })
    });

    newsCount = await new Promise((resolve,reject) => {
      connection.query(
        "select count(1) as 'count' from view_application_news",
        (error, result) => {
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
        })
    });

      const _newsList = crypto.encryptData({newsList: newsList, newsCount: newsCount});

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _newsList,
      });
  })();
  }


function getNewsById(req, res, next) {
  var news;
  var newsId = req.params.id;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getNewsById,
    [newsId],
    (error, result) => {
      if (!error) {
        news = result[0];
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

      const _news = crypto.encryptData(news);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _news,
      });
    }
  );
}

function getNewsForSlider(req, res, next) {
  var newsList = [];
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getNewsForSlider,
    (error, result) => {
      if (!error) {
        newsList = result;
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

      const _newsList = crypto.encryptData(newsList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _newsList,
      });
    }
  );
}

exports.getNews = getNews;
exports.getNewsById = getNewsById;
exports.getNewsForSlider = getNewsForSlider;
