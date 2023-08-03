const queries = require("../../queries/admin/seasons");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getSeasons(req, res, next) {
  try {
    var seasonList = [];
    var message;

    connection.query(queries.getSeasons, (error, result) => {
      if (!error) {
        seasonList = result;
      } else {
        message = error.sqlMessage;
      }

      const _seasonList = crypto.encryptData(seasonList);

      res.status(200).json({
        data: _seasonList,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function createSeason(req, res, next) {
  try {
    const seasonInfo = req.body;
    var message;
    var seasonId;

    connection.query(
      queries.createSeason,
      [
        seasonInfo.createdAt,
        seasonInfo.createdBy,
        seasonInfo.updatedAt,
        seasonInfo.updatedBy,
        seasonInfo.seasonName,
        seasonInfo.seasonYear,
        seasonInfo.isActive,
      ],
      (error, result) => {
        if (!error) {
          seasonId = result.insertId;
        } else {
          message = error.sqlMessage;
        }

        const _seasonId = crypto.encryptData(seasonId);

        res.status(200).json({
          data: _seasonId,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function updateSeason(req, res, next) {
  try {
    const seasonInfo = req.body;
    var message;
    var seasonId = req.params.id;

    connection.query(
      queries.updateSeason,
      [
        seasonInfo.createdAt,
        seasonInfo.createdBy,
        seasonInfo.updatedAt,
        seasonInfo.updatedBy,
        seasonInfo.seasonName,
        seasonInfo.seasonYear,
        seasonInfo.isActive,
        seasonInfo.id || seasonId,
      ],
      (error, result) => {
        if (!error) {
        } else {
          message = error.sqlMessage;
        }
        res.status(200).json({

        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function deleteSeason(req, res, next) {
  try {
    var seasonId = req.params.id;
    var message;

    connection.query(queries.deleteSeason, [seasonId], (error, result) => {
      if (!error) {
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({

      });
    });
  } catch (error) {
    console.log(error);
  }
}

exports.getSeasons = getSeasons;
exports.createSeason = createSeason;
exports.updateSeason = updateSeason;
exports.deleteSeason = deleteSeason;
