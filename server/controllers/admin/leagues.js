const queries = require("../../queries/admin/leagues");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');

function getLeagues(req, res, next) {
  try {
    var leagueList = [];
    const seasonId = req.params.seasonid;
    var message;

    connection.query(queries.getLeagues,
      [seasonId],
      (error, result) => {
      if (!error) {
        leagueList = result;
      } else {
        message = error.sqlMessage;
      }

      const _leagueList = crypto.encryptData(leagueList);

      res.status(200).json({
        data: _leagueList,
      });
    });
  } catch (error) {
    next(error);
  }
}

function createLeague(req, res, next) {
  try {
    const leagueInfo = req.body;
    var message;
    var leagueId;

    connection.query(
      queries.createLeague,
      [
        leagueInfo.createdAt,
        leagueInfo.createdBy,
        leagueInfo.updatedAt,
        leagueInfo.updatedBy,
        leagueInfo.seasonId,
        leagueInfo.leagueName,
        leagueInfo.category,
        leagueInfo.leagueType,
        leagueInfo.isActive,
        leagueInfo.orderNo,
      ],
      (error, result) => {
        if (!error) {
          leagueId = result.insertId;
        } else {
          message = error.sqlMessage;
        }

        const _leagueId = crypto.encryptData(leagueId);

        res.status(200).json({
          data: _leagueId,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function updateLeague(req, res, next) {
  try {
    const leagueInfo = req.body;
    var message;

    connection.query(
      queries.updateLeague,
      [
        leagueInfo.createdAt,
        leagueInfo.createdBy,
        leagueInfo.updatedAt,
        leagueInfo.updatedBy,
        leagueInfo.seasonId,
        leagueInfo.leagueName,
        leagueInfo.category,
        leagueInfo.leagueType,
        leagueInfo.isActive,
        leagueInfo.orderNo,
        leagueInfo.id,
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

function deleteLeague(req, res, next) {
  try {
    var leagueId = req.params.id;
    var message;

    connection.query(queries.deleteLeague, [leagueId], (error, result) => {
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

exports.getLeagues = getLeagues;
exports.createLeague = createLeague;
exports.updateLeague = updateLeague;
exports.deleteLeague = deleteLeague;
