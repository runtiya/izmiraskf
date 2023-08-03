const queries = require("../../queries/application/weeklymatchlist");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getWeeklyMatchList(req, res, next) {
  try {
    var weeklyMatchList = [];
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
        }

        const _weeklyMatchList = crypto.encryptData(weeklyMatchList);

        res.status(200).json({
          data: _weeklyMatchList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getWeeklyMatchList = getWeeklyMatchList;
