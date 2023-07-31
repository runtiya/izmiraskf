const connection = require("../../functions/database").connectDatabase();

function getNews(req, res, next) {
  try {
    var newsList;
    var message;

    connection.query("select * from view_application_news", (error, result) => {
      if (!error) {
        newsList = result;
      } else {
        message = error.sqlMessage;
        newsList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || "News fetched successfully!",
        newsList: newsList,
      });
    });
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
      "select * from view_application_news where id = ?",
      [newsId],
      (error, result) => {
        if (!error) {
          news = result[0];
        } else {
          message = error.sqlMessage;
        }

        res.status(200).json({
          news: news,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function getNewsForSlider(req, res, next) {
  try {
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
          newsList: newsList,
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
