const connection = require('../../functions/database').connectDatabase();

function getSeasons(req, res, next) {
  var seasonList;
  var message;

  connection.query(
    "select * from view_seasons",
    (error, result) => {
      if (!error) {
        seasonList = result;
      } else {
        message = error.sqlMessage;
        seasonList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Seasons fetched successfully!',
        seasonList: seasonList
      });
    });
}

function createSeason(req, res, next) {
  const seasonInfo = req.body;
  var message;
  var seasonId;
  connection.query(
    "insert into seasons(seasonname, seasonyear, isactive)values (?, ?, ?)",
    [ seasonInfo.seasonName,
      seasonInfo.seasonYear,
      seasonInfo.isActive
    ],
    (error, result) => {
      if (!error) {
        seasonId = result.insertId;
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'Season added successfully!',
        seasonId: seasonId
      });
    });
}


function updateSeason(req, res, next) {
  const seasonInfo = req.body;
  var message;
  var seasonId;
  connection.query(
    "update seasons set seasonname = ?, seasonyear = ?, isactive = ?  where id = ?",
    [ seasonInfo.seasonName,
      seasonInfo.seasonYear,
      seasonInfo.isActive,
      seasonInfo.id
    ],
    (error, result) => {
      if (!error) {
        console.log(result);
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'Season updated successfully!',
      });
    });
}

function deleteSeason(req, res, next) {
  var seasonId =  req.params.id;
  var message;
  connection.query(
    "delete from seasons where id = ?",
    [seasonId],
    (error, result) => {
      if (!error) {
        console.log(result);
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'Season deleted successfully!',
      });
  });
}


exports.getSeasons = getSeasons;
exports.createSeason = createSeason;
exports.updateSeason = updateSeason;
exports.deleteSeason = deleteSeason;
