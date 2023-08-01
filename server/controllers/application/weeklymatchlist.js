const queries = require("../../queries/application/weeklymatchlist");
const connection = require("../../functions/database").connectDatabase();

function getWeeklyMatchList(req, res, next) {
  try {
    var weeklyMatchList;
    var message;
    var seasonId = req.params.seasonid;

    connection.query(
      queries.getWeeklyMatchList,
      [seasonId],
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

exports.getWeeklyMatchList = getWeeklyMatchList;
