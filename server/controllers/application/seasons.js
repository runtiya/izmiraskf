const queries = require("../../queries/application/seasons");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getSeasons(req, res, next) {
  try {
    var seasonList = [];
    var message;

    connection.query(
      queries.getSeasons,
      (error, result) => {
        if (!error) {
          seasonList = result;
        } else {
          message = error.sqlMessage;
        }

        const _seasonList = crypto.encryptData(seasonList);

        res.status(200).json({
          data: _seasonList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getSeasons = getSeasons;
