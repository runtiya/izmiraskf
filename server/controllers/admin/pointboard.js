const queries = require("../../queries/admin/pointboard");
const connection = require("../../functions/database").connectDatabase();

function getPointBoard(req, res, next) {
  try {
    const groupstageId = req.params.groupstageid;
    const matchWeek = req.params.matchweek;
    var pointBoard;
    var message;

    connection.query(
      queries.getPointBoard,
      [groupstageId, matchWeek],
      (error, result) => {
        if (!error) {
          pointBoard = result;
        } else {
          message = error.sqlMessage;
          pointBoard = [];
        }

        res.status(200).json({
          pointBoard: pointBoard,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getPointBoard = getPointBoard;
