const connection = require('../../functions/database').connectDatabase();

function getWeeklyMatchList(req, res, next) {
  var weeklyMatchList;
  var message;
  var weeklyMatchProgramId = req.params.weeklymatchprogramid;

  connection.query(
    "select * from view_admin_weeklymatchlist where weeklymatchprogramid = ?",
    [
      weeklyMatchProgramId
    ],
    (error, result) => {
      if (!error) {
        weeklyMatchList = result;
      } else {
        message = error.sqlMessage;
        weeklyMatchList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Weekly Match List fetched successfully!',
        weeklyMatchList: weeklyMatchList
      });
    }
  );
}

function createWeeklyMatchList(req, res, next) {
  const weeklyMatchList = req.body;
  var message;
  var _error = false;

  try {
    for (let i = 0; i < weeklyMatchList.length; i++) {
      const _match = weeklyMatchList[i];

      connection.query(
        "insert into weeklymatchlist(createdat, createdby, updatedat, updatedby, weeklymatchprogramid, matchid, matchno, isinlist) values (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          _match.createdAt,
          _match.createdBy,
          _match.updatedAt,
          _match.updatedBy,
          _match.weeklyMatchProgramId,
          _match.matchId,
          _match.matchNo,
          _match.isInList
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
      message: message || 'Weekly Match List created successfully!'
    });
  }
}

function addMatchToList(req, res, next) {
  const weeklyMatchInfo = req.body;
  var message;
  var weeklyMatchId;

  connection.query(
    "insert into weeklymatchlist(createdat, createdby, updatedat, updatedby, weeklymatchprogramid, matchid, matchno, isinlist) values (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      weeklyMatchInfo.createdAt,
      weeklyMatchInfo.createdBy,
      weeklyMatchInfo.updatedAt,
      weeklyMatchInfo.updatedBy,
      weeklyMatchInfo.weeklyMatchProgramId,
      weeklyMatchInfo.matchId,
      weeklyMatchInfo.matchNo,
      weeklyMatchInfo.isInList
    ],
    (error, result) => {
      if (!error) {
        weeklyMatchId = result.insertId;
      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Weekly Match added successfully',
        weeklyMatchId
      });
    }
  );
}

function updateWeeklyMatchList(req, res, next) {
  const weeklyMatchInfo = req.body;
  var weeklyMatchId = req.params.id;
  var message;

  connection.query(
    "update weeklymatchlist set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, weeklymatchprogramid = ?, matchid = ?, matchno = ?, isinlist = ? where id = ? and weeklymatchprogramid = ?",
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
      weeklyMatchInfo.weeklyMatchProgramId
    ],
    (error, result) => {
      if (!error) {

      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Weekly Match updated successfully!'
      });
    }
  );
}

function clearWeeklyMatchList(req, res, next) {
  var weeklyMatchProgramId = req.params.id;
  var message;

  connection.query(
    "delete from weeklymatchlist where weeklymatchprogramid = ?",
    [
      weeklyMatchProgramId
    ],
    (error, result) => {
      if (!error) {

      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Weekly Match List deleted successfully!'
      });
    }
  );
}

function deleteMatchFromList(req, res, next) {
  var weeklyMatchListId = req.params.id;
  var message;

  connection.query(
    "delete from weeklymatchlist where id = ?",
    [
      weeklyMatchListId
    ],
    (error, result) => {
      if (!error) {

      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Weekly Match deleted successfully!'
      });
    }
  );
}


exports.getWeeklyMatchList = getWeeklyMatchList;
exports.addMatchToList = addMatchToList;
exports.createWeeklyMatchList = createWeeklyMatchList
exports.updateWeeklyMatchList = updateWeeklyMatchList;
exports.clearWeeklyMatchList = clearWeeklyMatchList;
exports.deleteMatchFromList = deleteMatchFromList;
