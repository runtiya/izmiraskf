const connection = require('../../functions/database').connectDatabase();

// Get all external links list
function getExternalLinks(req, res, next) {
  var extlinkList;
  const linkType = req.params.linktype;
  var message;

  connection.query(
    "select * from view_application_externallinks where linktype = ?",
    [
      linkType
    ],
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



exports.getExternalLinks = getExternalLinks;

