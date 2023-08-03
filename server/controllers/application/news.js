const queries = require("../../queries/application/news");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getNews(req, res, next) {
  try {
    var newsList = [];
    var message;

    connection.query(
      queries.getNews,
      (error, result) => {
        if (!error) {
          newsList = result;
        } else {
          message = error.sqlMessage;
        }

        const _newsList = crypto.encryptData(newsList);

        res.status(200).json({
          data: _newsList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function getNewsById(req, res, next) {
  try {
    var news;
    var newsId = req.params.id;
    var message;

    connection.query(
      queries.getNewsById,
      [newsId],
      (error, result) => {
        if (!error) {
          news = result[0];
        } else {
          message = error.sqlMessage;
        }

        const _news = crypto.encryptData(news);

        res.status(200).json({
          data: _news,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function getNewsForSlider(req, res, next) {
  try {
    var newsList = [];
    var message;

    connection.query(
      queries.getNewsForSlider,
      (error, result) => {
        if (!error) {
          newsList = result;
        } else {
          message = error.sqlMessage;
        }

        const _newsList = crypto.encryptData(newsList);

        res.status(200).json({
          data: _newsList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getNews = getNews;
exports.getNewsById = getNewsById;
exports.getNewsForSlider = getNewsForSlider;
