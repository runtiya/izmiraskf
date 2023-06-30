const connection = require('../../functions/database').connectDatabase();

function getDocuments(req, res, next) {
  const category = req.params.category;
  var documentsList;
  var message;

  connection.query(
    "select * from view_application_documents where category = ?",
    [category],
    (error, result) => {
      if (!error) {
        documentsList = result;
      } else {
        message = error.sqlMessage;
        documentsList = [];
      }

      res.status(200).json({
        error: false,
        message: message || 'Documents fetched successfully!',
        documentsList: documentsList
      });
    }
  );
}



exports.getDocuments = getDocuments;

