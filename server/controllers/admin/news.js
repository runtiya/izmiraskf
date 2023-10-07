const queries = require("../../queries/admin/news");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const imagesFunction = require("../../functions/images");
const errorService = require('../../services/error-service.js');

function getNews(req, res, next) {
  var newsList = [];
  var newsCount = 0;
  const paginationPageSize = +req.query.paginationPageSize;
  const paginationCurrentPage = +req.query.paginationCurrentPage;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  const newsListPromise = new Promise(async (resolve, reject) => {
    connection.query(
      (!!paginationPageSize && !!paginationCurrentPage) ? queries.getNewsWithPagination : queries.getNews,
      [
        paginationPageSize,
        (paginationCurrentPage - 1) * paginationPageSize
      ],
      (error, result) => {
        if(!error){
          newsList = result;
          resolve();
        }else{
          resolve(error);
        }
      });
  });

  const newsCountPromise = new Promise(async (resolve, reject) => {
    connection.query(
      queries.getNewsCount,
      (error, result) => {
        if(!error){
          newsCount = result[0].count;
          resolve();
        }else{
          resolve(error);
        }
      });
  });

  Promise.all([newsListPromise, newsCountPromise])
    .then(() => {

    })
    .catch((error) => {
      errorService.handleError(
        errorService.errors.DATABASE_ERROR.code,
        errorService.errors.DATABASE_ERROR.message,
        error.sqlMessage
      );

      _error = true;
      _resStatus = errorService.errors.DATABASE_ERROR.code;
      _message = errorService.errors.DATABASE_ERROR.message;
    })
    .finally(() => {
      const _newsList = crypto.encryptData({newsList: newsList, newsCount: newsCount});

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _newsList,
      });
    });
}


function findNews(req, res, next) {

}

function createNews(req, res, next) {
    const newsInfo = JSON.parse(req.body.requestData);
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    if (!!req.file) {
      const imagePath = imagesFunction.setImagePath(
        "images/news/",
        req.file.filename
      );

      newsInfo.imagePath = imagePath;
    } else {
      if (!newsInfo.imagePath) {
        newsInfo.imagePath = null;
      }
    }

    connection.query(
      queries.createNews,
      [
        newsInfo.createdAt,
        newsInfo.createdBy,
        newsInfo.updatedAt,
        newsInfo.updatedBy,
        newsInfo.title,
        newsInfo.content,
        newsInfo.imagePath,
        newsInfo.isVisible,
      ],
      (error, result) => {
        if (!error) {
          newsInfo.id = result.insertId;
          newsInfo.createdByUsername = req.userData.email;
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

        const _newsInfo = crypto.encryptData(newsInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _newsInfo,
        });
      }
    );
}

function updateNews(req, res, next) {
    const newsInfo = JSON.parse(req.body.requestData);
    var _resStatus = 200;
    var _error = false;
    var _message = null;
    var newsId = req.params.id;

    if (!!req.file) {
      const imagePath = imagesFunction.setImagePath(
        "images/news/",
        req.file.filename
      );
      newsInfo.imagePath = imagePath;
    } else {
      if (!newsInfo.imagePath) {
        newsInfo.imagePath = null;
      }
    }

    connection.query(
      queries.updateNews,
      [
        newsInfo.createdAt,
        newsInfo.createdBy,
        newsInfo.updatedAt,
        newsInfo.updatedBy,
        newsInfo.title,
        newsInfo.content,
        newsInfo.imagePath,
        newsInfo.isVisible,
        newsId || newsInfo.id,
      ],
      (error, result) => {
        if (!error) {
            newsInfo.updatedByUsername = req.userData.email;

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

        const _newsInfo = crypto.encryptData(newsInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _newsInfo,
        });
      }
    );
}

function deleteNews(req, res, next) {
    var newsId = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.deleteNews,
      [newsId],
      (error, result) => {
        if (!error) {

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

        res.status(_resStatus).json({
          error: _error,
          message: _message
        });
    });
}

exports.getNews = getNews;
exports.findNews = findNews;
exports.createNews = createNews;
exports.updateNews = updateNews;
exports.deleteNews = deleteNews;
