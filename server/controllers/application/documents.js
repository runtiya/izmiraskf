const queries = require("../../queries/application/documents");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getDocuments(req, res, next) {
  try {
    const fileCategory = req.params.filecategory;
    var documentsList = [];
    var message;

    connection.query(
      queries.getDocuments,
      [fileCategory],
      (error, result) => {
        if (!error) {
          documentsList = result;
        } else {
          message = error.sqlMessage;
        }

        const _documentsList = crypto.encryptData(documentsList);

        res.status(200).json({
          data: _documentsList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getDocuments = getDocuments;
