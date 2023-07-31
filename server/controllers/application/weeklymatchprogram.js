const connection = require("../../functions/database").connectDatabase();

function getWeeklyMatchProgram(req, res, next) {
  try {
    var weeklyMatchProgramList;
    var message;
    var seasonId = req.params.seasonid;

    connection.query(
      "select * from view_application_weeklymatchprogram where seasonid = ?",
      [seasonId],
      (error, result) => {
        if (!error) {
          weeklyMatchProgramList = result;
        } else {
          message = error.sqlMessage;
          weeklyMatchProgramList = [];
        }

        res.status(200).json({
          weeklyMatchProgramList: weeklyMatchProgramList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getWeeklyMatchProgram = getWeeklyMatchProgram;
