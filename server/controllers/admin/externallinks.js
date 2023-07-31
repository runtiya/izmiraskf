const queryexternallinks = require('../../queries/queryexternallinks');
const connection = require('../../functions/database').connectDatabase();
const imagesFunction = require('../../functions/images');

// Get all external links list
function getExternalLinks(req, res, next) {
  var extlinkList;
  var message;

  connection.query(
    queryexternallinks.getExternalLinks,
    (error, result) => {
      if (!error) {
        extlinkList = result;
      } else {
        message = error.sqlMessage;
        extlinkList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'External Links fetched successfully!',
        externalLinks: extlinkList
      });
    });
}

// Create a external link
function createExternalLink(req, res, next) {
  const linkInfo = JSON.parse(req.body.linkInfo);
  var message;
  var linkId;

  if (!!req.file) {
    const url = req.protocol + "://" + req.get("host");
    const imagePath = imagesFunction.setImagePath(url, "/images/icons/", req.file.filename);
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
      linkInfo.isActive
    ],
    (error, result) => {
      if (!error) {
        linkId = result.insertId;
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'External Links added successfully!',
        linkId: linkId
      });
    });
}

// Update an external link by id
function updateExternalLink(req, res, next) {
  const linkInfo = JSON.parse(req.body.linkInfo);
  var message;

  if (!!req.file) {
    const url = req.protocol + "://" + req.get("host");
    const imagePath = imagesFunction.setImagePath(url, "/images/icons/", req.file.filename);
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
      linkInfo.id
    ],
    (error, result) => {
      if (!error) {

      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'External Link updated successfully!'
      });
    });
}

// Delete an external link by id
function deleteExternalLink(req, res, next) {
  var linkId =  req.params.id;
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
        error: !!error,
        message: message || 'External Link deleted successfully!',
      });
  });
}


exports.getExternalLinks = getExternalLinks;
exports.createExternalLink = createExternalLink;
exports.updateExternalLink = updateExternalLink;
exports.deleteExternalLink = deleteExternalLink;
