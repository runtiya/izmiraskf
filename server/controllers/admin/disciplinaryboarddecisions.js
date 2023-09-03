const queries = require('../../queries/admin/disciplinaryboarddecisions');
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getDisciplinaryBoardDecisions(req, res, next) {
  var disciplinaryBoardDecisionList = [];
  const disciplinaryBoardFileId = req.params.fileid;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getDisciplinaryBoardDecisions,
    [disciplinaryBoardFileId],
    (error, result) => {
      if (!error) {
        disciplinaryBoardDecisionList = result;
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

      const _disciplinaryBoardDecisionList = crypto.encryptData(disciplinaryBoardDecisionList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _disciplinaryBoardDecisionList
      });
    }
  );
}

function createDisciplinaryBoardDecision(req, res, next) {
  const disciplinaryBoardDecisionInfo = req.body;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.createDisciplinaryBoardDecision,
    [
      disciplinaryBoardDecisionInfo.createdAt,
      disciplinaryBoardDecisionInfo.createdBy,
      disciplinaryBoardDecisionInfo.updatedAt,
      disciplinaryBoardDecisionInfo.updatedBy,
      disciplinaryBoardDecisionInfo.disciplinaryBoardFileId,
      disciplinaryBoardDecisionInfo.leagueId,
      disciplinaryBoardDecisionInfo.teamId,
      disciplinaryBoardDecisionInfo.fullName,
      disciplinaryBoardDecisionInfo.licenseNo,
      disciplinaryBoardDecisionInfo.belongingTo,
      disciplinaryBoardDecisionInfo.penalType,
      disciplinaryBoardDecisionInfo.duration,
      disciplinaryBoardDecisionInfo.explanation,
    ],
    (error, result) => {
      if (!error) {
        disciplinaryBoardDecisionInfo.id = result.insertId;
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

      const _disciplinaryBoardDecisionInfo = crypto.encryptData(disciplinaryBoardDecisionInfo);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _disciplinaryBoardDecisionInfo,
      });
    }
  );
}

function updateDisciplinaryBoardDecision(req, res, next) {
  const disciplinaryBoardDecisionInfo = req.body;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.updateDisciplinaryBoardDecision,
    [
      disciplinaryBoardDecisionInfo.createdAt,
      disciplinaryBoardDecisionInfo.createdBy,
      disciplinaryBoardDecisionInfo.updatedAt,
      disciplinaryBoardDecisionInfo.updatedBy,
      disciplinaryBoardDecisionInfo.disciplinaryBoardFileId,
      disciplinaryBoardDecisionInfo.leagueId,
      disciplinaryBoardDecisionInfo.teamId,
      disciplinaryBoardDecisionInfo.fullName,
      disciplinaryBoardDecisionInfo.licenseNo,
      disciplinaryBoardDecisionInfo.belongingTo,
      disciplinaryBoardDecisionInfo.penalType,
      disciplinaryBoardDecisionInfo.duration,
      disciplinaryBoardDecisionInfo.explanation,
      disciplinaryBoardDecisionInfo.id,
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

      const _disciplinaryBoardDecisionInfo = crypto.encryptData(disciplinaryBoardDecisionInfo);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _disciplinaryBoardDecisionInfo
      });
    }
  );
}

function deleteDisciplinaryBoardDecision(req, res, next) {
  var disciplinaryBoardDecisionId = req.params.id;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.deleteDisciplinaryBoardDecision,
    [disciplinaryBoardDecisionId],
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

function clearDisciplinaryBoardDecisions(req, res, next) {
  var disciplinaryBoardFileId = req.params.fileid;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.clearDisciplinaryBoardDecisions,
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

exports.getDisciplinaryBoardDecisions = getDisciplinaryBoardDecisions;
exports.createDisciplinaryBoardDecision = createDisciplinaryBoardDecision;
exports.updateDisciplinaryBoardDecision = updateDisciplinaryBoardDecision;
exports.deleteDisciplinaryBoardDecision = deleteDisciplinaryBoardDecision;
exports.clearDisciplinaryBoardDecisions = clearDisciplinaryBoardDecisions;
