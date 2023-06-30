const connection = require('../../functions/database').connectDatabase();

function getNews(req, res, next) {
  var newsList;
  var message;

  connection.query(
    "select * from view_application_news",
    (error, result) => {
      if (!error) {
        newsList = result;
      } else {
        message = error.sqlMessage;
        newsList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'News fetched successfully!',
        newsList: newsList
      });
    });
}

function getNewsById(req, res, next) {
  var news;
  var newsId = req.params.id;
  var message;

  connection.query(
    "select * from view_application_news where id = ?",
    [
      newsId
    ],
    (error, result) => {
      if (!error) {
        news = result[0];
      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'News fetched successfully!',
        news: news
      });
    }
  );
}

function getNewsForSlider(req, res, next) {
  var newsList;
  var message;

  connection.query(
    "select * from view_application_newsforslider",
    (error, result) => {
      if (!error) {
        newsList = result;
      } else {
        message = error.sqlMessage;
        newsList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'News fetched successfully!',
        newsList: newsList
      });
    });
}

exports.getNews = getNews;
exports.getNewsById = getNewsById;
exports.getNewsForSlider = getNewsForSlider;
