const queries = require("../../queries/application/aboutizmiraskf");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

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

        const _aboutContent = crypto.encryptData(aboutContent);

        res.status(200).json({
          data: _aboutContent
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

        const _logoPath = crypto.encryptData(logoPath);

        res.status(200).json({
          data: _logoPath,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getAboutContent = getAboutContent;
exports.getLogoPath = getLogoPath;
