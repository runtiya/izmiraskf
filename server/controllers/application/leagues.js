const queries = require("../../queries/application/leagues");
const connection = require("../../functions/database").connectDatabase();

function getLeagues(req, res, next) {
  try {
    var leagueList;
    const seasonId = req.params.seasonid;
    var message;

    connection.query(
      queries.getLeagues,
      [seasonId],
      (error, result) => {
        if (!error) {
          leagueList = result;
        } else {
          message = error.sqlMessage;
          leagueList = [];
        }

        res.status(200).json({
          leagueList: leagueList,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getLeagues = getLeagues;
