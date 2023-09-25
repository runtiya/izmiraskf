const queries = require("../../queries/admin/groupstages");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getGroupStages(req, res, next) {
    var groupstageList = [];
    const leagueId = req.params.leagueid;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.getGroupStages,
      [leagueId],
      (error, result) => {
        if (!error) {
          groupstageList = result;
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

        const _groupstageList = crypto.encryptData(groupstageList);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _groupstageList
        });
    });
}

function getWeekSequence(req, res, next) {
    const groupstageId = req.params.id;
    var weekSequence = [];
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.getWeekSequence,
      [groupstageId],
      (error, result) => {
        if (!error) {
          weekSequence = result;
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

        const _weekSequence = crypto.encryptData(weekSequence);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _weekSequence,
        });
      }
    );
}

function getPlayedLastMatchWeek(req, res, next) {
    const groupstageId = req.params.id;
    var matchWeek = 1;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.getPlayedLastMatchWeek,
      [groupstageId],
      (error, result) => {
        if (!error) {
          matchWeek = result[0].matchWeek || 1;
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

        const _matchWeek = crypto.encryptData(matchWeek);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _matchWeek,
        });
      }
    );
}

function createGroupStage(req, res, next) {
    const groupInfo = req.body;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.createGroupStage,
      [
        groupInfo.createdAt,
        groupInfo.createdBy,
        groupInfo.updatedAt,
        groupInfo.updatedBy,
        groupInfo.leagueId,
        groupInfo.groupName,
        groupInfo.periodSystem,
        groupInfo.isActive,
        groupInfo.orderNo,
      ],
      (error, result) => {
        if (!error) {
          groupInfo.id = result.insertId;
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

        const _groupInfo = crypto.encryptData(groupInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _groupInfo,
        });
      }
    );
}

function updateGroupStage(req, res, next) {
    const groupInfo = req.body;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.updateGroupStage,
      [
        groupInfo.createdAt,
        groupInfo.createdBy,
        groupInfo.updatedAt,
        groupInfo.updatedBy,
        groupInfo.leagueId,
        groupInfo.groupName,
        groupInfo.periodSystem,
        groupInfo.isActive,
        groupInfo.orderNo,
        groupInfo.id,
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

        const _groupInfo = crypto.encryptData(groupInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _groupInfo,
        });
      }
    );
}

function deleteGroupStage(req, res, next) {
    var groupId = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.deleteGroupStage,
      [groupId],
      (error, result) => {
        if (!error) {

        } else {
          if (error.errno == 1451) {
            errorService.handleError(
              errorService.errors.DATABASE_FOREIGNKEY_ERROR.code,
              errorService.errors.DATABASE_FOREIGNKEY_ERROR.message,
              error.sqlMessage
            );

            _error = true;
            _resStatus = errorService.errors.DATABASE_FOREIGNKEY_ERROR.code;
            _message = errorService.errors.DATABASE_FOREIGNKEY_ERROR.message;
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
        }

        res.status(_resStatus).json({
          error: _error,
          message: _message
        });
    });
}

exports.getGroupStages = getGroupStages;
exports.getWeekSequence = getWeekSequence;
exports.getPlayedLastMatchWeek = getPlayedLastMatchWeek;
exports.createGroupStage = createGroupStage;
exports.updateGroupStage = updateGroupStage;
exports.deleteGroupStage = deleteGroupStage;
