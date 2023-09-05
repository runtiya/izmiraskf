const queries = require('../../queries/admin/aboutizmirtff.js');
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const imagesFunction = require('../../functions/images');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getAboutContent(req, res, next) {
  var aboutContent;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(queries.getAboutContent, (error, result) => {
    if (!error) {
      aboutContent = result[0];
    } else {
      errorService.handleError(
        errorService.errors.SERVER_ERROR_DATABASE.code,
        errorService.errors.SERVER_ERROR_DATABASE.message,
        error.sqlMessage
      );
      _error = true;
      _resStatus = errorService.errors.SERVER_ERROR_DATABASE.code;
      _message = errorService.errors.SERVER_ERROR_DATABASE.message;
    }

    const _aboutContent = crypto.encryptData(aboutContent);

    res.status(_resStatus).json({
      error: _error,
      message: _message,
      data: _aboutContent
    });
  });
}

function updateAboutContent(req, res, next) {
  const aboutContent = JSON.parse(req.body.aboutContent);
  var _resStatus = 200;
  var _error = false;
  var _message = null;

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
        errorService.handleError(
          errorService.errors.DATABASE_ERROR.code,
          errorService.errors.DATABASE_ERROR.message,
          error.sqlMessage
        );

        _error = true;
        _resStatus = errorService.errors.DATABASE_ERROR.code;
        _message = errorService.errors.DATABASE_ERROR.message;

      }

      const _aboutContent = crypto.encryptData(aboutContent);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _aboutContent
      });
    }
  );
}

exports.getAboutContent = getAboutContent;
exports.updateAboutContent = updateAboutContent;
