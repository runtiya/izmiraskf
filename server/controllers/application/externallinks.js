const queries = require("../../queries/application/externallinks");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

// Get all external links list
function getExternalLinks(req, res, next) {
  try {
    var extlinkList = [];
    const linkType = req.params.linktype;
    var message;

    connection.query(
      queries.getExternalLinks,
      [linkType],
      (error, result) => {
        if (!error) {
          extlinkList = result;
        } else {
          message = error.sqlMessage;
        }

        const _extlinkList = crypto.encryptData(extlinkList);

        res.status(200).json({
          data: _extlinkList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getExternalLinks = getExternalLinks;
