const queries = require("../../queries/application/statistics");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getTeamsCountByTown(req, res, next) {
  try {
    var teamsCountByTown = [];
    var message;

    connection.query(queries.getTeamsCountByTown, (error, result) => {
      if (!error) {
        teamsCountByTown = result;
      } else {
        message = error.sqlMessage;
      }

      const _teamsCountByTown = crypto.encryptData(teamsCountByTown);

      res.status(200).json({
        data: _teamsCountByTown,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function getStadiumsCountByTown(req, res, next) {
  try {
    var stadiumsCountByTown = [];
    var message;

    connection.query(queries.getStadiumsCountByTown, (error, result) => {
      if (!error) {
        stadiumsCountByTown = result;
      } else {
        message = error.sqlMessage;
      }

      const _stadiumsCountByTown = crypto.encryptData(stadiumsCountByTown);

      res.status(200).json({
        data: _stadiumsCountByTown,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function getStadiumsCountByFloorType(req, res, next) {
  try {
    var stadiumsCountByFloorType = [];
    var message;

    connection.query(queries.getStadiumsCountByFloorType, (error, result) => {
      if (!error) {
        stadiumsCountByFloorType = result;
      } else {
        message = error.sqlMessage;
      }

      const _stadiumsCountByFloorType = crypto.encryptData(stadiumsCountByFloorType);

      res.status(200).json({
        data: _stadiumsCountByFloorType,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

exports.getTeamsCountByTown = getTeamsCountByTown;
exports.getStadiumsCountByTown = getStadiumsCountByTown;
exports.getStadiumsCountByFloorType = getStadiumsCountByFloorType;
