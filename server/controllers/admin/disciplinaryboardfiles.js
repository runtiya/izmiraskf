const queries = require('../../queries/admin/disciplinaryboardfiles');
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getDisciplinaryBoardFiles(req, res, next) {
  var disciplinaryBoardFileList = [];
  const seasonId = req.params.seasonid;
  const caseType = req.params.casetype;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getDisciplinaryBoardFiles,
    [seasonId, caseType],
    (error, result) => {
      if (!error) {
        disciplinaryBoardFileList = result;
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

      const _disciplinaryBoardFileList = crypto.encryptData(disciplinaryBoardFileList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _disciplinaryBoardFileList
      });
    }
  );
}

function createDisciplinaryBoardFile(req, res, next) {
  const disciplinaryBoardFileInfo = req.body;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.createDisciplinaryBoardFile,
    [
      disciplinaryBoardFileInfo.createdAt,
      disciplinaryBoardFileInfo.createdBy,
      disciplinaryBoardFileInfo.updatedAt,
      disciplinaryBoardFileInfo.updatedBy,
      disciplinaryBoardFileInfo.seasonId,
      disciplinaryBoardFileInfo.caseNo,
      disciplinaryBoardFileInfo.caseDate,
      disciplinaryBoardFileInfo.caseType,
      disciplinaryBoardFileInfo.title,
      disciplinaryBoardFileInfo.participants,
      disciplinaryBoardFileInfo.explanation,
    ],
    (error, result) => {
      if (!error) {
        disciplinaryBoardFileInfo.id = result.insertId;
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

      const _disciplinaryBoardFileInfo = crypto.encryptData(disciplinaryBoardFileInfo);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _disciplinaryBoardFileInfo,
      });
    }
  );
}

function updateDisciplinaryBoardFile(req, res, next) {
  const disciplinaryBoardFileInfo = req.body;
  var disciplinaryBoardFileId = req.params.id;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.updateDisciplinaryBoardFile,
    [
      disciplinaryBoardFileInfo.createdAt,
      disciplinaryBoardFileInfo.createdBy,
      disciplinaryBoardFileInfo.updatedAt,
      disciplinaryBoardFileInfo.updatedBy,
      disciplinaryBoardFileInfo.seasonId,
      disciplinaryBoardFileInfo.caseNo,
      disciplinaryBoardFileInfo.caseDate,
      disciplinaryBoardFileInfo.caseType,
      disciplinaryBoardFileInfo.title,
      disciplinaryBoardFileInfo.participants,
      disciplinaryBoardFileInfo.explanation,
      disciplinaryBoardFileId || disciplinaryBoardFileInfo.id,
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

      const _disciplinaryBoardFileInfo = crypto.encryptData(disciplinaryBoardFileInfo);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _disciplinaryBoardFileInfo,
      });
    }
  );
}

function deleteDisciplinaryBoardFile(req, res, next) {
  var disciplinaryBoardFileId = req.params.id;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.deleteDisciplinaryBoardFile,
    [disciplinaryBoardFileId],
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

exports.getDisciplinaryBoardFiles = getDisciplinaryBoardFiles;
exports.createDisciplinaryBoardFile = createDisciplinaryBoardFile;
exports.updateDisciplinaryBoardFile = updateDisciplinaryBoardFile;
exports.deleteDisciplinaryBoardFile = deleteDisciplinaryBoardFile;
