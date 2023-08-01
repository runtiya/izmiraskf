const queries = require("../../queries/application/aboutizmiraskf");
const connection = require("../../functions/database.js").connectDatabase();

function getAboutContent(req, res, next) {
  try {
    var aboutContent;
    var message;

    connection.query(
      queries.getAboutContent,
      (error, result) => {
        if (!error) {
          aboutContent = result[0];
        } else {
          message = error.sqlMessage;
        }

        res.status(200).json({
          aboutContent: aboutContent,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function getLogoPath(req, res, next) {
  try {
    var logoPath = null;

    connection.query(
      queries.getLogoPath,
      (error, result) => {
        if (!error) {
          logoPath = result[0].imagePath;
        } else {
        }

        res.status(200).json({
          logoPath: logoPath,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getAboutContent = getAboutContent;
exports.getLogoPath = getLogoPath;
