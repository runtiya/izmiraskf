const queries = require("../../queries/admin/teams");

const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const imagesFunction = require("../../functions/images");

function getTeams(req, res, next) {
  (async () => {
    try {
      var teamsList = [];
      var teamsCount = 0;
      var message;

      const paginationPageSize = +req.query.paginationPageSize;
      const paginationCurrentPage = +req.query.paginationCurrentPage;

      teamsList = await new Promise((resolve, reject) => {
        connection.query(
          (!!paginationPageSize && !!paginationCurrentPage) ? queries.getTeamsWithPagination : queries.getTeams,
          [
            paginationPageSize,
            (paginationCurrentPage - 1) * paginationPageSize
          ],
        (error,result) => {
          if(!error){
            resolve(result);
          }else{
            resolve(error.sqlMessage);
          }
        });
      });

      teamsCount = await new Promise((resolve, reject) => {
        connection.query(
          "select count(1) as 'count' from view_admin_teams",
          (error,result) => {
            if(!error){
              resolve(result[0].count);
            }else{
              resolve(error.sqlMessage);
            }
          });
      });

      const _data = crypto.encryptData({teamsList: teamsList, teamsCount: teamsCount});

      res.status(200).json({
        data: _data
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: error
      })
    };
})();
}

// Get a team by id
function findTeam(req, res, next) {
  // There isn't any query. __MS
}

function createTeam(req, res, next) {
  try {
    const teamInfo = JSON.parse(req.body.teamInfo);
    var message;
    var teamId;

    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const imagePath = imagesFunction.setImagePath(
        url,
        "/images/teams/",
        req.file.filename
      );
      teamInfo.imagePath = imagePath;
    } else {
      teamInfo.imagePath = null;
    }

    connection.query(
      queries.createTeam,
      [
        teamInfo.createdAt,
        teamInfo.createdBy,
        teamInfo.updatedAt,
        teamInfo.updatedBy,
        teamInfo.TFFClubCode,
        teamInfo.officialName,
        teamInfo.shortName,
        teamInfo.imagePath,
        teamInfo.city,
        teamInfo.town,
        teamInfo.address,
        teamInfo.longitude,
        teamInfo.latitude,
        teamInfo.phoneNumber,
        teamInfo.faxNumber,
        teamInfo.stadiumId,
        teamInfo.presidentName,
        teamInfo.colorCodes,
        teamInfo.websiteURL,
        teamInfo.isASKFMember,
        teamInfo.isVisible,
      ],
      (error, result) => {
        if (!error) {
          teamId = result.insertId;
          teamInfo.id  = teamId;
        } else {
          message = error.sqlMessage;
        }

        const _team = crypto.encryptData(teamInfo);

        res.status(200).json({
          data: _team,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function updateTeam(req, res, next) {
  try {
    const teamInfo = JSON.parse(req.body.teamInfo);
    var message;
    var teamId = req.params.id;

    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const imagePath = imagesFunction.setImagePath(
        url,
        "/images/teams/",
        req.file.filename
      );
      teamInfo.imagePath = imagePath;
    } else {
      if (!teamInfo.imagePath) {
        teamInfo.imagePath = null;
      }
    }

    connection.query(
      queries.updateTeam,
      [
        teamInfo.createdAt,
        teamInfo.createdBy,
        teamInfo.updatedAt,
        teamInfo.updatedBy,
        teamInfo.TFFClubCode,
        teamInfo.officialName,
        teamInfo.shortName,
        teamInfo.imagePath,
        teamInfo.city,
        teamInfo.town,
        teamInfo.address,
        teamInfo.longitude,
        teamInfo.latitude,
        teamInfo.phoneNumber,
        teamInfo.faxNumber,
        teamInfo.stadiumId,
        teamInfo.presidentName,
        teamInfo.colorCodes,
        teamInfo.websiteURL,
        teamInfo.isASKFMember,
        teamInfo.isVisible,
        teamInfo.id || teamId,
      ],
      (error, result) => {
        if (!error) {
        } else {
          message = error.sqlMessage;
        }

        const _team = crypto.encryptData(teamInfo);

        res.status(200).json({
          data: _team,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function deleteTeam(req, res, next) {
  try {
    var teamId = req.params.id;
    var message;


    connection.query(
      queries.deleteTeam,
      [teamId],
      (error, result) => {
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

exports.getTeams = getTeams;
exports.findTeam = findTeam;
exports.createTeam = createTeam;
exports.updateTeam = updateTeam;
exports.deleteTeam = deleteTeam;
