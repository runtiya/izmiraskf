const queries = require("../../queries/admin/news");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const imagesFunction = require("../../functions/images");

function getNews(req, res, next) {
  (async () => {
  try {
    var newsList = [];
    var newsCount = 0;
    var message;

    const paginationPageSize = +req.query.paginationPageSize;
    const paginationCurrentPage = +req.query.paginationCurrentPage;

    newsList = await new Promise((resolve, reject) => {
      connection.query(
        (!!paginationPageSize && !!paginationCurrentPage) ? queries.getNewsWithPagination : queries.getNews,
        [
          paginationPageSize,
          (paginationCurrentPage - 1) * paginationPageSize
        ],
        (error, result) => {
          if(!error){
            resolve(result);
          }else{
            resolve(error.sqlMessage);
          }
        })
    });

    newsCount = await new Promise((resolve, reject) => {
      connection.query(
        "select count(1) as 'count' from view_admin_news",
        (error, result) => {
          if(!error){
            resolve(result[0].count);
          }else{
            resolve(error.sqlMessage);
          }
        })
    });

      const _data = crypto.encryptData({newsList: newsList, newsCount: newsCount});

      res.status(200).json({
        data: _data,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error
    });
}
 })();
}

// Get a news by id
function findNews(req, res, next) {

}

function createNews(req, res, next) {
  try {
    const newsInfo = JSON.parse(req.body.newsInfo);
    var message;
    var newsId;

    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const imagePath = imagesFunction.setImagePath(
        url,
        "/images/news/",
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
          newsId = result.insertId;
          newsInfo.id = newsId;
        } else {
          message = error.sqlMessage;
        }

        const _newsInfo = crypto.encryptData(newsInfo);

        res.status(200).json({
          data: _newsInfo,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function updateNews(req, res, next) {
  try {
    const newsInfo = JSON.parse(req.body.newsInfo);
    var message;
    var newsId = req.params.id;

    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const imagePath = imagesFunction.setImagePath(
        url,
        "/images/news/",
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
          //
        } else {
          message = error.sqlMessage;
        }

        const _newsInfo = crypto.encryptData(newsInfo);

        res.status(200).json({
          data: _newsInfo,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function deleteNews(req, res, next) {
  try {
    var newsId = req.params.id;
    var message;
    connection.query(queries.deleteNews, [newsId], (error, result) => {
      if (!error) {
        //
      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({

      });
    });
  } catch (error) {
    console.log(error);
  }
}

exports.getNews = getNews;
exports.findNews = findNews;
exports.createNews = createNews;
exports.updateNews = updateNews;
exports.deleteNews = deleteNews;
