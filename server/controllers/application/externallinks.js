const queries = require("../../queries/application/externallinks");
const connection = require("../../functions/database").connectDatabase();

// Get all external links list
function getExternalLinks(req, res, next) {
  try {
    var extlinkList;
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
          extlinkList = [];
        }

        res.status(200).json({
          externalLinks: extlinkList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getExternalLinks = getExternalLinks;
