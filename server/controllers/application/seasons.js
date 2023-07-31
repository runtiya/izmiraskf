const connection = require("../../functions/database").connectDatabase();

function getSeasons(req, res, next) {
  try {
    var seasonList;
    var message;

    connection.query(
      "select * from view_application_seasons",
      (error, result) => {
        if (!error) {
          seasonList = result;
        } else {
          message = error.sqlMessage;
          seasonList = [];
        }

        res.status(200).json({
          seasonList: seasonList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getSeasons = getSeasons;
