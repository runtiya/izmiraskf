const queries = require("../../queries/application/stadiums");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getStadiums(req, res, next) {
  try {
    var stadiumList = [];
    var message;

    connection.query(
      queries.getStadiums,
      (error, result) => {
        if (!error) {
          stadiumList = result;
        } else {
          message = error.sqlMessage;
        }

        const _stadiumList = crypto.encryptData(stadiumList);

        res.status(200).json({
          data: _stadiumList,
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
     queries.getStadiumById,
      [stadiumId],
      (error, result) => {
        if (!error) {
          stadium = result[0];
        } else {
          message = error.sqlMessage;
        }

        const _stadium = crypto.encryptData(stadium);

        res.status(200).json({
          data: _stadium,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getStadiums = getStadiums;
exports.getStadiumById = getStadiumById;
