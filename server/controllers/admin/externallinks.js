const connection = require('../../functions/database').connectDatabase();

// Get all external links list
function getExternalLinks(req, res, next) {
  var extlinkList;
  var message;

  connection.query(
    "select * from view_admin_externallinks",
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
  const linkInfo = req.body;

  var message;
  var linkId;
  connection.query(
    "insert into externallinks(createdat, createdby, updatedat, updatedby, linkname, url, linktype, iconimage, fabrand, orderno, isactive)values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      linkInfo.createdAt,
      linkInfo.createdBy,
      linkInfo.updatedAt,
      linkInfo.updatedBy,
      linkInfo.linkName,
      linkInfo.url,
      linkInfo.linkType,
      linkInfo.iconImage,
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
  const linkInfo = req.body;
  var message;
  connection.query(
    "update externallinks set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, linkname = ?, url = ?, linktype = ?, iconimage = ?, fabrand = ?, orderno = ?, isactive = ? where id = ?",
    [
      linkInfo.createdAt,
      linkInfo.createdBy,
      linkInfo.updatedAt,
      linkInfo.updatedBy,
      linkInfo.linkName,
      linkInfo.url,
      linkInfo.linkType,
      linkInfo.iconImage,
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
    "delete from externallinks where id = ?",
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
