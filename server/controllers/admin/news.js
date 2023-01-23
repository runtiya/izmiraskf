const connection = require('../../functions/database').connectDatabase();

function getNews(req, res, next) {
  var newsList;
  var message;

  connection.query(
    "select * from view_news",
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
        news: newsList
      });
    });


}


// Get a news by id
function findNews(req, res, next) {

}


function createNews(req, res, next) {
  const newsInfo = req.body;
  var message;
  var newsId;
  connection.query(
    "insert into news(title, content, newsimage, isonline)values (?, ?, ?, ?)",
    [newsInfo.title, newsInfo.content, newsInfo.newsImage, newsInfo.isOnline],
    (error, result) => {
      if (!error) {
        newsId = result.insertId;
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'News added successfully!',
        newsId: newsId
      });
    });

}


function updateNews(req, res, next) {
  const newsInfo = req.body;
  var message;
  connection.query(
    "update news set title = ?, content = ?, newsimage = ?, isonline = ? where id = ?",
    [newsInfo.title, newsInfo.content, newsInfo.newsImage, newsInfo.isOnline, newsInfo.id],
    (error, result) => {
      if (!error) {
        console.log(result);
      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'News updated successfully!'
      });
    });

}


function deleteNews(req, res, next) {
  var newsId =  req.params.id;
  var message;
  connection.query(
    "delete from news where id = ?",
    [newsId],
    (error, result) => {
      if (!error) {
        console.log(result);
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'News deleted successfully!',
      });
  });
}


exports.getNews = getNews;
exports.findNews = findNews;
exports.createNews = createNews;
exports.updateNews = updateNews;
exports.deleteNews = deleteNews;
