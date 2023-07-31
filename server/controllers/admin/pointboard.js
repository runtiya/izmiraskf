const querypointboard = require('../../queries/querypointboard');
const connection = require('../../functions/database').connectDatabase();

function getPointBoard(req, res, next) {
  const groupstageId = req.params.groupstageid;
  const matchWeek = req.params.matchweek;
  var pointBoard;
  var message;

  connection.query(
    querypointboard.getPointBoard,
    [
      groupstageId,
      matchWeek
    ],
    (error, result) => {
      if (!error) {
        pointBoard = result;
      } else {
        message = error.sqlMessage;
        pointBoard = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Point Board fetched successfully!',
        pointBoard: pointBoard
      });
    }
  );
}



exports.getPointBoard = getPointBoard;

