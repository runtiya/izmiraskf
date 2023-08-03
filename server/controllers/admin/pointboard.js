const queries = require("../../queries/admin/pointboard");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getPointBoard(req, res, next) {
  try {
    const groupstageId = req.params.groupstageid;
    const matchWeek = req.params.matchweek;
    var pointBoard = [];
    var message;

    connection.query(
      queries.getPointBoard,
      [groupstageId, matchWeek],
      (error, result) => {
        if (!error) {
          pointBoard = result;
        } else {
          message = error.sqlMessage;
        }

        const _pointBoard = crypto.encryptData(pointBoard);

        res.status(200).json({
          data: _pointBoard,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getPointBoard = getPointBoard;
