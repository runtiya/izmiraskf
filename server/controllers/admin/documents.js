const queries = require("../../queries/admin/documents");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const filesFunction = require("../../functions/files");
const errorService = require('../../services/error-service.js');

function getDocuments(req, res, next) {
    const fileCategory = req.params.filecategory;
    var documentsList = [];
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.getDocuments,
      [fileCategory],
      (error, result) => {
      if (!error) {
        documentsList = result;
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

      const _documentsList = crypto.encryptData(documentsList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _documentsList,
      });
    });
}

function createDocument(req, res, next) {
    const documentInfo = JSON.parse(req.body.documentInfo);
    const fileCategory = req.params.filecategory;
    var _resStatus = 200;
    var _error = false;
    var _message = null;


    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const filePath = filesFunction.setFilePath(
        url,
        fileCategory,
        req.file.filename
      );
      documentInfo.filePath = filePath;
      //documentInfo.fileName = req.file.filename;
      documentInfo.fileMimeType = req.file.mimetype;
      documentInfo.fileSize = req.file.size;
    } else {
      documentInfo.filePath = null;
      documentInfo.fileName = null;
      documentInfo.fileMimeType = null;
      documentInfo.fileSize = null;
    }

    connection.query(
      queries.createDocument,
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
        fileCategory || documentInfo.fileCategory,
        documentInfo.fileType,
        documentInfo.orderNo,
      ],
      (error, result) => {
        if (!error) {
          documentInfo.id = result.insertId;
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

        const _documentInfo = crypto.encryptData({documentInfo});

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _documentInfo,
        });
      }
    );
}

function updateDocument(req, res, next) {
    const documentInfo = JSON.parse(req.body.documentInfo);
    const fileCategory = req.params.filecategory;
    const documentId = req.params.id;
    var documentFilePath;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const filePath = filesFunction.setFilePath(
        url,
        fileCategory,
        req.file.filename
      );
      documentInfo.filePath = filePath;
      //documentInfo.fileName = req.file.filename;
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
      queries.updateDocument,
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
        fileCategory || documentInfo.fileCategory,
        documentInfo.fileType,
        documentInfo.orderNo,
        documentId || documentInfo.id,
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

        const _documentInfo = crypto.encryptData({documentInfo});

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _documentInfo,
        });
      }
    );
}

function deleteDocument(req, res, next) {
    const documentId = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.deleteDocument,
      [documentId],
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

exports.getDocuments = getDocuments;
exports.createDocument = createDocument;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;
