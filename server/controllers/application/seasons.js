const connection = require('../../functions/database').connectDatabase();

function getSeasons(req, res, next) {
  var seasonList;
  var message;

  connection.query(
    "select * from view_application_seasons",
    (error, result) => {
      if (!error) {
        seasonList = result;
      } else {
        message = error.sqlMessage;
        seasonList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Seasons fetched successfully!',
        seasonList: seasonList
      });
    });
}


exports.getSeasons = getSeasons;

