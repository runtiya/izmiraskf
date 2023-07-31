const queries = require("../../queries/admin/teams");

const connection = require("../../functions/database").connectDatabase();
const imagesFunction = require("../../functions/images");

function getTeams(req, res, next) {
  try {
    var teamList;
    var message;

    connection.query(queries.getTeams, (error, result) => {
      if (!error) {
        teamList = result;
      } else {
        message = error.sqlMessage;
        teamList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || "Teams fetched successfully!",
        teamList: teamList,
      });
    });
  } catch (error) {
    console.log(error);
  }
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
        } else {
          message = error.sqlMessage;
        }

        res.status(200).json({
          teamId: teamId,
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
        res.status(200).json({
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
    connection.query(queries.deleteTeam, [teamId], (error, result) => {
      if (!error) {
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || "Stadium deleted successfully!",
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
