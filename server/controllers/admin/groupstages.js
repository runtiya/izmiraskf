const connection = require('../../functions/database').connectDatabase();

function getGroupStages(req, res, next) {
  var groupstageList;
  const leagueId = req.params.leagueid;
  var message;
  

  connection.query(
    "select * from view_groupstages where leagueid = ?",
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

function createGroupStage(req, res, next) {
  const groupInfo = req.body;
  var message;
  var groupId;

  connection.query(
    "insert into groupstages(leagueid, groupname, periodsystem, orderno) values(?, ?, ?, ?)",
    [
      groupInfo.leagueId,
      groupInfo.groupName,
      groupInfo.periodSystem,
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
    "update groupstages set leagueid = ?, groupname = ?, periodsystem = ?, orderno = ? where id = ?",
    [
      groupInfo.leagueId,
      groupInfo.groupName,
      groupInfo.periodSystem,
      groupInfo.orderNo,
      groupInfo.id
    ],
    (error, result) => {
      if (!error) {
        console.log(result);
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
        console.log(result);
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
exports.createGroupStage = createGroupStage;
exports.updateGroupStage = updateGroupStage;
exports.deleteGroupStage = deleteGroupStage;
