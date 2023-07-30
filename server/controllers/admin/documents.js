const querydocuments = require('../../queries/querydocuments');
const connection = require('../../functions/database').connectDatabase();
const filesFunction = require('../../functions/files');

function getDocuments(req, res, next) {
  const category = req.params.category;
  var documentsList;
  var message;

  connection.query(
    querydocuments.getDocuments,
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

function createDocument(req, res, next) {
  const documentInfo = JSON.parse(req.body.documentInfo);
  const category = req.params.category;
  var documentId;
  var message;

  if (!!req.file) {
    const url = req.protocol + "://" + req.get("host");
    const filePath = filesFunction.setFilePath(url, category, req.file.filename);
    documentInfo.filePath = filePath;
    documentInfo.fileName = req.file.filename;
    documentInfo.fileMimeType = req.file.mimetype;
    documentInfo.fileSize = req.file.size;

  } else {
    documentInfo.filePath = null;
    documentInfo.fileName = null;
    documentInfo.fileMimeType = null;
    documentInfo.fileSize = null;
  }

  connection.query(
    querydocuments.createDocument,
    [
      documentInfo.createdAt,
      documentInfo.createdBy,
      documentInfo.updatedAt,
      documentInfo.updatedBy,
      documentInfo.documentName,
      documentInfo.fileName,
      documentInfo.fileMimeType,
      documentInfo.fileSize,
      documentInfo.filePath,
      category || documentInfo.category,
      documentInfo.orderNo
    ],
    (error, result) => {
      if (!error) {
        documentId = result.insertId;
      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: false,
        message: message || 'Document added successfully!',
        documentId: documentId
      });
    }
  )
}

function updateDocument(req, res, next) {

  const documentInfo = JSON.parse(req.body.documentInfo);
  const category = req.params.category;
  const documentId = req.params.id;
  var message;

  if (!!req.file) {
    const url = req.protocol + "://" + req.get("host");
    const filePath = filesFunction.setFilePath(url, category, req.file.filename);
    documentInfo.filePath = filePath;
    documentInfo.fileName = req.file.filename;
    documentInfo.fileMimeType = req.file.mimetype;
    documentInfo.fileSize = req.file.size;
  } else {
    if (!documentInfo.filePath) {
      documentInfo.filePath = null;
      documentInfo.fileName = null;
      documentInfo.fileMimeType = null;
      documentInfo.fileSize = null;
    }
  }

  connection.query(
   querydocuments.updateDocument,
    [
      documentInfo.createdAt,
      documentInfo.createdBy,
      documentInfo.updatedAt,
      documentInfo.updatedBy,
      documentInfo.documentName,
      documentInfo.fileName,
      documentInfo.fileMimeType,
      documentInfo.fileSize,
      documentInfo.filePath,
      category || documentInfo.category,
      documentInfo.orderNo,
      documentId || documentInfo.id
    ],
    (error, result) => {
      if (!error) {
      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: false,
        message: message || 'Document updated successfully!',
      });
    }
  )
}

function deleteDocument(req, res, next) {
  const documentId = req.params.id;
  // There wasn't any select query. __MS
  res.status(200).json({
    error: false,
    message: 'Document deleted successfully!'
  });
}


exports.getDocuments = getDocuments;
exports.createDocument = createDocument;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;
