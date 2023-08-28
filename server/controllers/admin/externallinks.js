const queryexternallinks = require("../../queries/admin/externallinks");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const imagesFunction = require("../../functions/images");

// Get all external links list
function getExternalLinks(req, res, next) {
  try {
    var extlinkList = [];
    var message;

    connection.query(queryexternallinks.getExternalLinks, (error, result) => {
      if (!error) {
        extlinkList = result;
      } else {
        message = error.sqlMessage;
      }

      const _extlinkList = crypto.encryptData(extlinkList);

      res.status(200).json({
        data: _extlinkList,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

// Create a external link
function createExternalLink(req, res, next) {
  try {
    const linkInfo = JSON.parse(req.body.linkInfo);
    var message;
    var linkId;

    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const imagePath = imagesFunction.setImagePath(
        url,
        "/images/icons/",
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
          linkId = result.insertId;
          linkInfo.id = linkId;
        } else {
          message = error.sqlMessage;
        }

        const _linkInfo = crypto.encryptData(linkInfo);

        res.status(200).json({
          data: _linkInfo,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// Update an external link by id
function updateExternalLink(req, res, next) {
  try {
    const linkInfo = JSON.parse(req.body.linkInfo);
    var message;

    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const imagePath = imagesFunction.setImagePath(
        url,
        "/images/icons/",
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
          message = error.sqlMessage;
        }

        const _linkInfo = crypto.encryptData(linkInfo);

        res.status(200).json({
          data: _linkInfo,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// Delete an external link by id
function deleteExternalLink(req, res, next) {
  try {
    var linkId = req.params.id;
    var message;
    connection.query(
      queryexternallinks.deleteExternalLink,
      [linkId],
      (error, result) => {
        if (!error) {
        } else {
          message = error.sqlMessage;
        }
        res.status(200).json({

        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getExternalLinks = getExternalLinks;
exports.createExternalLink = createExternalLink;
exports.updateExternalLink = updateExternalLink;
exports.deleteExternalLink = deleteExternalLink;
