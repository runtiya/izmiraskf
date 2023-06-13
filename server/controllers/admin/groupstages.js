const connection = require('../../functions/database').connectDatabase();

function getGroupStages(req, res, next) {
  var groupstageList;
  const leagueId = req.params.leagueid;
  var message;


  connection.query(
    "select * from view_admin_groupstages where leagueid = ?",
    [leagueId],
    (error, result) => {
      if (!error) {
        groupstageList = result;
      } else {
        message = error.sqlMessage;
        groupstageList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Groups fetched successfully!',
        groupstageList: groupstageList
      });
    }
  );

}

function getWeekSequence(req, res, next) {
  const groupstageId = req.params.id;
  var weekSequence;
  var message;

  connection.query(
    "select distinct(f.matchweek) as weekSequence from fixtures f join groupstages g on g.id = f.groupstageid where f.groupstageid = ? order by weekSequence",
    [groupstageId],
    (error, result) => {
      if (!error) {
        weekSequence = result;
      } else {
        message = error.sqlMessage;
        weekSequence = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Week Sequence Info fetched successfully!',
        weekSequence: weekSequence
      });
    }

  );
}

function getPlayedLastMatchWeek(req, res, next) {
  const groupstageId = req.params.id;
  var matchWeek;
  var message;

  connection.query(
    "select max(matchweek) as matchWeek from view_admin_fixtures where groupstageid = ? and matchstatus = 'PLAYED'",
    [groupstageId],
    (error, result) => {
      if (!error) {
        matchWeek = result[0].matchWeek;
      } else {
        message = error.sqlMessage;
        matchWeek = null;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Last Match Week fetched successfully!',
        matchWeek: matchWeek
      });
    }

  );
}

function createGroupStage(req, res, next) {
  const groupInfo = req.body;
  var message;
  var groupId;

  connection.query(
    "insert into groupstages(createdat, createdby, updatedat, updatedby, leagueid, groupname, periodsystem, isactive, orderno) values(?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      groupInfo.createdAt,
      groupInfo.createdBy,
      groupInfo.updatedAt,
      groupInfo.updatedBy,
      groupInfo.leagueId,
      groupInfo.groupName,
      groupInfo.periodSystem,
      groupInfo.isActive,
      groupInfo.orderNo
    ],
    (error, result) => {
      if (!error) {
        groupId = result.insertId;
      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Groups added successfully!',
        groupId: groupId
      });
    }
  );
}


function updateGroupStage(req, res, next) {
  const groupInfo = req.body;
  var message;
  connection.query(
    "update groupstages set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, leagueid = ?, groupname = ?, periodsystem = ?, isactive = ?, orderno = ? where id = ?",
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
      groupInfo.id
    ],
    (error, result) => {
      if (!error) {

      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'Group updated successfully!',
      });
    });
}


function deleteGroupStage(req, res, next) {
  var groupId =  req.params.id;
  var message;

  connection.query(
    "delete from groupstages where id = ?",
    [groupId],
    (error, result) => {
      if (!error) {

      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Group deleted successfully!'
      });
  });
}

exports.getGroupStages = getGroupStages;
exports.getWeekSequence = getWeekSequence;
exports.getPlayedLastMatchWeek = getPlayedLastMatchWeek;
exports.createGroupStage = createGroupStage;
exports.updateGroupStage = updateGroupStage;
exports.deleteGroupStage = deleteGroupStage;
