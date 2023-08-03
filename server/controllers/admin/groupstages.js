const queries = require("../../queries/admin/groupstages");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getGroupStages(req, res, next) {
  try {
    var groupstageList = [];
    const leagueId = req.params.leagueid;
    var message;

    connection.query(queries.getGroupStages, [leagueId], (error, result) => {
      if (!error) {
        groupstageList = result;
      } else {
        message = error.sqlMessage;
      }

      const _groupstageList = crypto.encryptData(groupstageList);

      res.status(200).json({
        data: _groupstageList
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function getWeekSequence(req, res, next) {
  try {
    const groupstageId = req.params.id;
    var weekSequence = [];
    var message;

    connection.query(
      queries.getWeekSequence,
      [groupstageId],
      (error, result) => {
        if (!error) {
          weekSequence = result;
        } else {
          message = error.sqlMessage;
        }

        const _weekSequence = crypto.encryptData(weekSequence);

        res.status(200).json({
          data: _weekSequence,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function getPlayedLastMatchWeek(req, res, next) {
  try {
    const groupstageId = req.params.id;
    var matchWeek = 1;
    var message;

    connection.query(
      queries.getPlayedLastMatchWeek,
      [groupstageId],
      (error, result) => {
        if (!error) {
          matchWeek = result[0].matchWeek || 1;
        } else {
          message = error.sqlMessage;
        }

        const _matchWeek = crypto.encryptData(matchWeek);

        res.status(200).json({
          data: _matchWeek,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function createGroupStage(req, res, next) {
  try {
    const groupInfo = req.body;
    var message;
    var groupId;

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
          groupId = result.insertId;
        } else {
          message = error.sqlMessage;
        }

        const _groupId = crypto.encryptData(groupId);

        res.status(200).json({
          data: _groupId,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function updateGroupStage(req, res, next) {
  try {
    const groupInfo = req.body;
    var message;
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
          message = error.sqlMessage;
        }
        res.status(200).json({

        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function deleteGroupStage(req, res, next) {
  try {
    var groupId = req.params.id;
    var message;

    connection.query(queries.deleteGroupStage, [groupId], (error, result) => {
      if (!error) {
      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({

      });
    });
  } catch (error) {
    console.log(error);
  }
}

exports.getGroupStages = getGroupStages;
exports.getWeekSequence = getWeekSequence;
exports.getPlayedLastMatchWeek = getPlayedLastMatchWeek;
exports.createGroupStage = createGroupStage;
exports.updateGroupStage = updateGroupStage;
exports.deleteGroupStage = deleteGroupStage;
