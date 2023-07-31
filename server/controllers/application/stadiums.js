const connection = require("../../functions/database").connectDatabase();

function getStadiums(req, res, next) {
  try {
    var stadiumList;
    var message;

    connection.query(
      "select * from view_application_stadiums",
      (error, result) => {
        if (!error) {
          stadiumList = result;
        } else {
          message = error.sqlMessage;
          stadiumList = [];
        }

        res.status(200).json({
          stadiums: stadiumList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function getStadiumById(req, res, next) {
  try {
    var stadium;
    var stadiumId = req.params.id;
    var message;

    connection.query(
      "select * from view_application_stadiums where id = ?",
      [stadiumId],
      (error, result) => {
        if (!error) {
          stadium = result[0];
        } else {
          message = error.sqlMessage;
        }

        res.status(200).json({
          stadium: stadium,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getStadiums = getStadiums;
exports.getStadiumById = getStadiumById;
