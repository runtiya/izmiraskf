const queries = require("../../queries/admin/news");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const imagesFunction = require("../../functions/images");

function getNews(req, res, next) {
  try {
    var newsList = [];
    var message;

    connection.query(queries.getNews, (error, result) => {
      if (!error) {
        newsList = result;
      } else {
        message = error.sqlMessage;
      }

      const _newsList = crypto.encryptData(newsList);

      res.status(200).json({
        data: _newsList,
      });
    });
  } catch (error) {
    console.log(error);
  }
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
        } else {
          message = error.sqlMessage;
        }

        const _newsId = crypto.encryptData(newsId);

        res.status(200).json({
          data: _newsId,
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

        res.status(200).json({

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
