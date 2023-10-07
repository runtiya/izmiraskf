const queryexternallinks = require("../../queries/admin/externallinks");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const imagesFunction = require("../../functions/images");
const errorService = require('../../services/error-service.js');

// Get all external links list
function getExternalLinks(req, res, next) {
    var extlinkList = [];
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(queryexternallinks.getExternalLinks, (error, result) => {
      if (!error) {
        extlinkList = result;
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

      const _extlinkList = crypto.encryptData(extlinkList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _extlinkList,
      });
    });
}


function createExternalLink(req, res, next) {
    const linkInfo = JSON.parse(req.body.requestData);
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    if (!!req.file) {
      const imagePath = imagesFunction.setImagePath(
        "images/icons/",
        req.file.filename
      );
      linkInfo.imagePath = imagePath;
    } else {
      linkInfo.imagePath = null;
    }

    connection.query(
      queryexternallinks.createExternalLink,
      [
        linkInfo.createdAt,
        linkInfo.createdBy,
        linkInfo.updatedAt,
        linkInfo.updatedBy,
        linkInfo.linkName,
        linkInfo.url,
        linkInfo.linkType,
        linkInfo.imagePath,
        linkInfo.faBrand,
        linkInfo.orderNo,
        linkInfo.isActive,
      ],
      (error, result) => {
        if (!error) {
          linkInfo.id = result.insertId;
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

        const _linkInfo = crypto.encryptData(linkInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _linkInfo,
        });
      }
    );
}

// Update an external link by id
function updateExternalLink(req, res, next) {
    const linkInfo = JSON.parse(req.body.requestData);
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    if (!!req.file) {
      const imagePath = imagesFunction.setImagePath(
        "images/icons/",
        req.file.filename
      );
      linkInfo.imagePath = imagePath;
    } else {
      if (!linkInfo.imagePath) {
        linkInfo.imagePath = null;
      }
    }

    connection.query(
      queryexternallinks.updateExternalLink,
      [
        linkInfo.createdAt,
        linkInfo.createdBy,
        linkInfo.updatedAt,
        linkInfo.updatedBy,
        linkInfo.linkName,
        linkInfo.url,
        linkInfo.linkType,
        linkInfo.imagePath,
        linkInfo.faBrand,
        linkInfo.orderNo,
        linkInfo.isActive,
        linkInfo.id,
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

        const _linkInfo = crypto.encryptData(linkInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _linkInfo,
        });
      }
    );
}

function deleteExternalLink(req, res, next) {
    var linkId = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queryexternallinks.deleteExternalLink,
      [linkId],
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

        res.status(_resStatus).json({
          error: _error,
          message: _message
        });
      }
    );
}

exports.getExternalLinks = getExternalLinks;
exports.createExternalLink = createExternalLink;
exports.updateExternalLink = updateExternalLink;
exports.deleteExternalLink = deleteExternalLink;
