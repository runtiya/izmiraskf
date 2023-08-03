const queries = require("../../queries/application/aboutizmirtff");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getAboutContent(req, res, next) {
  try {
    var aboutContent = [];
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
          data: _aboutContent,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getAboutContent = getAboutContent;
