const connection = require('../../functions/database').connectDatabase();

function getLeagues(req, res, next) {
  var leagueList;
  const seasonId = req.params.seasonid;
  var message;

  connection.query(
    "select * from view_leagues where seasonid = ?",
    [seasonId],
    (error, result) => {
      if (!error) {
        leagueList = result;
      } else {
        message = error.sqlMessage;
        leagueList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Leagues fetched successfully!',
        leagueList: leagueList
      });
    });
}

function createLeague(req, res, next) {
  const leagueInfo = req.body;
  var message;
  var leagueId;

  connection.query(
    "insert into leagues(createdat, createdby, updatedat, updatedby, seasonid, leaguename, category, leaguetype, isactive, orderno) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [ 
      leagueInfo.createdAt,
      leagueInfo.createdBy,
      leagueInfo.updatedAt,
      leagueInfo.updatedBy,
      leagueInfo.seasonId,
      leagueInfo.leagueName,
      leagueInfo.category,
      leagueInfo.leagueType,
      leagueInfo.isActive,
      leagueInfo.orderNo
    ],
    (error, result) => {
      if (!error) {
        leagueId = result.insertId;
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'League added successfully!',
        leagueId: leagueId
      });
    });
}


function updateLeague(req, res, next) {
  const leagueInfo = req.body;
  var message;

  connection.query(
    "update leagues set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, seasonid = ?, leaguename = ?, category = ?, leaguetype = ?, isactive = ?, orderno = ? where id = ?",
    [ 
      leagueInfo.createdAt,
      leagueInfo.createdBy,
      leagueInfo.updatedAt,
      leagueInfo.updatedBy,
      leagueInfo.seasonId,
      leagueInfo.leagueName,
      leagueInfo.category,
      leagueInfo.leagueType,
      leagueInfo.isActive,
      leagueInfo.orderNo,
      leagueInfo.id
    ],
    (error, result) => {
      if (!error) {
        console.log(result);
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'League updated successfully!',
      });
    });
}

function deleteLeague(req, res, next) {
  var leagueId =  req.params.id;
  var message;
  
  connection.query(
    "delete from leagues where id = ?",
    [leagueId],
    (error, result) => {
      if (!error) {
        console.log(result);
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'League deleted successfully!',
      });
  });
}


exports.getLeagues = getLeagues;
exports.createLeague = createLeague;
exports.updateLeague = updateLeague;
exports.deleteLeague = deleteLeague;
