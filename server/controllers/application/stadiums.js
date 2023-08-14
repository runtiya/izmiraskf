const queries = require("../../queries/application/stadiums");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getStadiums(req, res, next) {
  (async () => {
  try {
    var stadiumsList = [];
    var stadiumsCount = 0;
    var message;

    const paginationPageSize = +req.query.paginationPageSize;
    const paginationCurrentPage = +req.query.paginationCurrentPage;

    stadiumsList = await new Promise((resolve, reject) => {
      connection.query(
        queries.getStadiums,
        [
          paginationPageSize,
          (paginationCurrentPage - 1) * paginationPageSize
        ],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            resolve(error.sqlMessage);
          }
        });
    });

    stadiumsCount = await new Promise((resolve, reject) => {
      connection.query(
        "select count(1) as 'count' from view_application_stadiums",
        (error,result) => {
          if(!error){
            resolve(result[0].count);
          }else{
            resolve(error.sqlMessage);
          }
        }
      );
    });

    const _data = crypto.encryptData({stadiumsList: stadiumsList, stadiumsCount: stadiumsCount});

    res.status(200).json({
      data: _data,
    });
  } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error
      });
  }
})();
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
