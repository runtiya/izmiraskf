const connection = require('../../functions/database').connectDatabase();

function getWeeklyMatchList(req, res, next) {
  var weeklyMatchList;
  var message;
  var seasonId = req.params.seasonid;

  connection.query(
    "select * from view_application_weeklymatchlist where weeklymatchprogramid in (select id from view_application_weeklymatchprogram where seasonid = ?)",
    [
      seasonId
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


exports.getWeeklyMatchList = getWeeklyMatchList;

