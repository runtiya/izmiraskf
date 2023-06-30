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

function getLogoPath(req, res, next) {
  var logoPath = null;

  connection.query(
    "select imagepath from view_application_aboutiaskf",
    (error, result) => {
      if (!error) {
        logoPath = result[0].imagePath;
      } else {

      }

      res.status(200).json({
        error: !!error,
        logoPath: logoPath
      })
    }
  )
}


exports.getAboutContent = getAboutContent;
exports.getLogoPath = getLogoPath;
