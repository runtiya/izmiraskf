const connection = require('../../functions/database').connectDatabase();

function getGroupStages(req, res, next) {
  var groupstageList;
  const leagueId = req.params.leagueid;
  var message;


  connection.query(
    "select * from view_application_groupstages where leagueid = ?",
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
    "select max(matchweek) as matchWeek from view_application_fixtures where groupstageid = ? and matchstatus = 'PLAYED'",
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

exports.getGroupStages = getGroupStages;
exports.getWeekSequence = getWeekSequence;
exports.getPlayedLastMatchWeek = getPlayedLastMatchWeek;
