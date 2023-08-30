const queries = require('../../queries/admin/aboutizmirtff.js');
const connection = require('../../functions/database.js').connectDatabase();
const imagesFunction = require('../../functions/images');
const crypto = require('../../functions/crypto');

function getAboutContent(req, res, next) {
  try {
    var aboutContent;
    var message;
    connection.query(queries.getAboutContent, (error, result) => {
      if (!error) {
        aboutContent = result[0];
      } else {
        message = error.sqlMessage;
      }

      const _aboutContent = crypto.encryptData(aboutContent);

      res.status(200).json({
        data: _aboutContent
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function updateAboutContent(req, res, next) {
  try {
    const aboutContent = JSON.parse(req.body.aboutContent);
    var message;

    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const imagePath = imagesFunction.setImagePath(
        url,
        "/images/",
        req.file.filename
      );
      aboutContent.imagePath = imagePath;
    } else {
      if (!aboutContent.imagePath) {
        aboutContent.imagePath = null;
      }
    }

    connection.query(
      queries.updateAboutContent,
      [
        aboutContent.updatedAt,
        aboutContent.updatedBy,
        aboutContent.imagePath,
        aboutContent.aboutText,
        aboutContent.address,
        aboutContent.phoneNumber,
        aboutContent.faxNumber,
        aboutContent.email,
        aboutContent.longitude,
        aboutContent.latitude,
        aboutContent.mapUrl
      ],
      (error, result) => {
        if (!error) {
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
exports.updateAboutContent = updateAboutContent;
