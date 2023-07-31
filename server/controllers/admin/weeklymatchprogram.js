const queries = require("../../queries/admin/weeklymatchprogram");
const connection = require("../../functions/database").connectDatabase();

function getWeeklyMatchProgram(req, res, next) {
  try {
    var weeklyMatchProgramList;
    var message;
    var seasonId = req.params.seasonid;

    connection.query(
      queries.getWeeklyMatchProgram,
      [seasonId],
      (error, result) => {
        if (!error) {
          weeklyMatchProgramList = result;
        } else {
          message = error.sqlMessage;
          weeklyMatchProgramList = [];
        }

        res.status(200).json({
          weeklyMatchProgramList: weeklyMatchProgramList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function createWeeklyMatchProgram(req, res, next) {
  try {
    const weeklyMatchProgramInfo = req.body;
    var message;
    var weeklyMatchProgramId;

    connection.query(
      queries.createWeeklyMatchProgram,
      [
        weeklyMatchProgramInfo.createdAt,
        weeklyMatchProgramInfo.createdBy,
        weeklyMatchProgramInfo.updatedAt,
        weeklyMatchProgramInfo.updatedBy,
        weeklyMatchProgramInfo.seasonId,
        weeklyMatchProgramInfo.beginDate,
        weeklyMatchProgramInfo.endDate,
        weeklyMatchProgramInfo.isActive,
      ],
      (error, result) => {
        if (!error) {
          weeklyMatchProgramId = result.insertId;
        } else {
          message = error.sqlMessage;
        }

        res.status(200).json({
          weeklyMatchProgramId: weeklyMatchProgramId,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function updateWeeklyMatchProgram(req, res, next) {
  try {
    const weeklyMatchProgramInfo = req.body;
    var message;
    var seasonId = req.params.seasonid;
    var weeklyMatchProgramId = req.params.id;

    connection.query(
      queries.updateWeeklyMatchProgram,
      [
        weeklyMatchProgramInfo.createdAt,
        weeklyMatchProgramInfo.createdBy,
        weeklyMatchProgramInfo.updatedAt,
        weeklyMatchProgramInfo.updatedBy,
        weeklyMatchProgramInfo.seasonId,
        weeklyMatchProgramInfo.beginDate,
        weeklyMatchProgramInfo.endDate,
        weeklyMatchProgramInfo.isActive,
        weeklyMatchProgramId || weeklyMatchProgramInfo.id,
        seasonId || weeklyMatchProgramInfo.seasonId,
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

function deleteWeeklyMatchProgram(req, res, next) {
  try {
    var seasonId = req.params.seasonid;
    var weeklyMatchProgramId = req.params.id;
    var message;

    connection.query(
      queries.deleteWeeklyMatchProgram,
      [weeklyMatchProgramId, seasonId],
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

exports.getWeeklyMatchProgram = getWeeklyMatchProgram;
exports.createWeeklyMatchProgram = createWeeklyMatchProgram;
exports.updateWeeklyMatchProgram = updateWeeklyMatchProgram;
exports.deleteWeeklyMatchProgram = deleteWeeklyMatchProgram;
