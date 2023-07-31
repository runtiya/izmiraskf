const queries = require("../../queries/admin/weeklymatchlist");
const connection = require("../../functions/database").connectDatabase();

function getWeeklyMatchList(req, res, next) {
  try {
    var weeklyMatchList;
    var message;
    var weeklyMatchProgramId = req.params.weeklymatchprogramid;

    connection.query(
      queries.getWeeklyMatchList,
      [weeklyMatchProgramId],
      (error, result) => {
        if (!error) {
          weeklyMatchList = result;
        } else {
          message = error.sqlMessage;
          weeklyMatchList = [];
        }

        res.status(200).json({
          weeklyMatchList: weeklyMatchList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function createWeeklyMatchList(req, res, next) {
  const weeklyMatchList = req.body;
  var message;
  var _error = false;

  try {
    for (let i = 0; i < weeklyMatchList.length; i++) {
      const _match = weeklyMatchList[i];

      connection.query(
        queries.createWeeklyMatchList,
        [
          _match.createdAt,
          _match.createdBy,
          _match.updatedAt,
          _match.updatedBy,
          _match.weeklyMatchProgramId,
          _match.matchId,
          _match.matchNo,
          _match.isInList,
        ],
        (error, result) => {
          if (!error) {
            //pass
          } else {
            message = error.sqlMessage;
            throw error;
          }
        }
      );
    }
  } catch (error) {
    connection.rollback(() => {
      _error = true;
    });
  } finally {
    res.status(200).json({
      error: _error,
      message: message || "Weekly Match List created successfully!",
    });
  }
}

function addMatchToList(req, res, next) {
  try {
    const weeklyMatchInfo = req.body;
    var message;
    var weeklyMatchId;

    connection.query(
      queries.addMatchToList,
      [
        weeklyMatchInfo.createdAt,
        weeklyMatchInfo.createdBy,
        weeklyMatchInfo.updatedAt,
        weeklyMatchInfo.updatedBy,
        weeklyMatchInfo.weeklyMatchProgramId,
        weeklyMatchInfo.matchId,
        weeklyMatchInfo.matchNo,
        weeklyMatchInfo.isInList,
      ],
      (error, result) => {
        if (!error) {
          weeklyMatchId = result.insertId;
        } else {
          message = error.sqlMessage;
        }

        res.status(200).json({
          weeklyMatchId,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function updateWeeklyMatchList(req, res, next) {
  try {
    const weeklyMatchInfo = req.body;
    var weeklyMatchId = req.params.id;
    var message;

    connection.query(
      queries.updateWeeklyMatchList,
      [
        weeklyMatchInfo.createdAt,
        weeklyMatchInfo.createdBy,
        weeklyMatchInfo.updatedAt,
        weeklyMatchInfo.updatedBy,
        weeklyMatchInfo.weeklyMatchProgramId,
        weeklyMatchInfo.matchId,
        weeklyMatchInfo.matchNo,
        weeklyMatchInfo.isInList,
        weeklyMatchId || weeklyMatchInfo.id,
        weeklyMatchInfo.weeklyMatchProgramId,
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

function clearWeeklyMatchList(req, res, next) {
  try {
    var weeklyMatchProgramId = req.params.id;
    var message;

    connection.query(
      queries,
      clearWeeklyMatchList,
      [weeklyMatchProgramId],
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

function deleteMatchFromList(req, res, next) {
  try {
    var weeklyMatchListId = req.params.id;
    var message;

    connection.query(
      queries.deleteMatchFromList,
      [weeklyMatchListId],
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

exports.getWeeklyMatchList = getWeeklyMatchList;
exports.addMatchToList = addMatchToList;
exports.createWeeklyMatchList = createWeeklyMatchList;
exports.updateWeeklyMatchList = updateWeeklyMatchList;
exports.clearWeeklyMatchList = clearWeeklyMatchList;
exports.deleteMatchFromList = deleteMatchFromList;
