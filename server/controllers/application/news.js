const queries = require("../../queries/application/news");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getNews(req, res, next) {
  (async () => {
  try {
    var newsList = [];
    var newsCount = 0;
    var message;

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
