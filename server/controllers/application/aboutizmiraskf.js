const connection = require('../../functions/database.js').connectDatabase();

function getAboutContent(req, res, next) {
  var aboutContent;
  var message;

  connection.query(
    "select * from view_application_aboutiaskf",
    (error, result) => {
      if (!error) {
        aboutContent = result[0];
      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'About Content fetched successfully!',
        aboutContent: aboutContent
      });
    }
  );
}


exports.getAboutContent = getAboutContent;
