const querynews = require('../../queries/querynews');
const connection = require('../../functions/database').connectDatabase();
const imagesFunction = require('../../functions/images');

function getNews(req, res, next) {
  var newsList;
  var message;

  connection.query(
    querynews.getNews,
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
  // There isn't any select query. __MS
}


function createNews(req, res, next) {
  const newsInfo = JSON.parse(req.body.newsInfo);;
  var message;
  var newsId;

  if (!!req.file) {
    const url = req.protocol + "://" + req.get("host");
    const imagePath = imagesFunction.setImagePath(url, "/images/news/", req.file.filename);
    newsInfo.imagePath = imagePath;
  } else {
    if (!newsInfo.imagePath) {
      newsInfo.imagePath = null;
    }
  }

  connection.query(
    querynews.createNews,
    [
      newsInfo.createdAt,
      newsInfo.createdBy,
      newsInfo.updatedAt,
      newsInfo.updatedBy,
      newsInfo.title,
      newsInfo.content,
      newsInfo.imagePath,
      newsInfo.isVisible
    ],
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
  const newsInfo = JSON.parse(req.body.newsInfo);;
  var message;
  var newsId = req.params.id;


  if (!!req.file) {
    const url = req.protocol + "://" + req.get("host");
    const imagePath = imagesFunction.setImagePath(url, "/images/news/", req.file.filename);
    newsInfo.imagePath = imagePath;
  } else {
    if (!newsInfo.imagePath) {
      newsInfo.imagePath = null;
    }
  }

  var message;
  connection.query(
    querynews.updateNews,
    [
      newsInfo.createdAt,
      newsInfo.createdBy,
      newsInfo.updatedAt,
      newsInfo.updatedBy,
      newsInfo.title,
      newsInfo.content,
      newsInfo.imagePath,
      newsInfo.isVisible,
      newsId || newsInfo.id
    ],
    (error, result) => {
      if (!error) {
        //
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
   querynews.deleteNews,
    [newsId],
    (error, result) => {
      if (!error) {
        //
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
