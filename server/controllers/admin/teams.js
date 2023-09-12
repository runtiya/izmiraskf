const queries = require("../../queries/admin/teams");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const imagesFunction = require("../../functions/images");
const errorService = require('../../services/error-service.js');

function getTeams(req, res, next) {
  var teamsList = [];
  var teamsCount = 0;
  const paginationPageSize = +req.query.paginationPageSize;
  const paginationCurrentPage = +req.query.paginationCurrentPage;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  const teamsListPromise = new Promise(async (resolve, reject) => {
    connection.query(
      (!!paginationPageSize && !!paginationCurrentPage) ? queries.getTeamsWithPagination : queries.getTeams,
      [
        paginationPageSize,
        (paginationCurrentPage - 1) * paginationPageSize
      ],
      (error, result) => {
        if (!error) {
          teamsList = result;
          resolve();
        } else {
          reject(error);
        }
      }
    );
  });

  const teamsCountPromise = new Promise(async (resolve, reject) => {
    connection.query(
      queries.getTeamsCount,
      (error, result) => {
        if (!error) {
          teamsCount = result[0].count;
          resolve();
        } else {
          reject(error);
        }
      }
    );
  });


  Promise.all([teamsListPromise, teamsCountPromise])
    .then(() => {

    })
    .catch((error) => {
      errorService.handleError(
        errorService.errors.DATABASE_ERROR.code,
        errorService.errors.DATABASE_ERROR.message,
        error.sqlMessage
      );

      _error = true;
      _resStatus = errorService.errors.DATABASE_ERROR.code;
      _message = errorService.errors.DATABASE_ERROR.message;

    })
    .finally(() => {
      const _teamsList = crypto.encryptData({ teamsList: teamsList, teamsCount: teamsCount });

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _teamsList
      });
    });
}

// Get a team by id
function findTeam(req, res, next) {

}

function createTeam(req, res, next) {
    const teamInfo = JSON.parse(req.body.requestData);
    var _resStatus = 200;
    var _error = false;
    var _message = null;

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
        teamInfo.phoneNumber,
        teamInfo.faxNumber,
        teamInfo.stadiumId,
        teamInfo.presidentName,
        teamInfo.colorCodes,
        teamInfo.websiteURL,
        teamInfo.isASKFMember,
        teamInfo.isVisible,
        teamInfo.longitude,
        teamInfo.latitude,
        teamInfo.mapUrl
      ],
      (error, result) => {
        if (!error) {
          teamInfo.id  = result.insertId;
        } else {
          errorService.handleError(
            errorService.errors.DATABASE_ERROR.code,
            errorService.errors.DATABASE_ERROR.message,
            error.sqlMessage
          );

          _error = true;
          _resStatus = errorService.errors.DATABASE_ERROR.code;
          _message = errorService.errors.DATABASE_ERROR.message;
        }

        const _teamInfo = crypto.encryptData(teamInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _teamInfo,
        });
      }
    );
}

function updateTeam(req, res, next) {
    const teamInfo = JSON.parse(req.body.requestData);
    var teamId = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

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
        teamInfo.phoneNumber,
        teamInfo.faxNumber,
        teamInfo.stadiumId,
        teamInfo.presidentName,
        teamInfo.colorCodes,
        teamInfo.websiteURL,
        teamInfo.isASKFMember,
        teamInfo.isVisible,
        teamInfo.longitude,
        teamInfo.latitude,
        teamInfo.mapUrl,
        teamInfo.id || teamId,
      ],
      (error, result) => {
        if (!error) {
        } else {
          errorService.handleError(
            errorService.errors.DATABASE_ERROR.code,
            errorService.errors.DATABASE_ERROR.message,
            error.sqlMessage
          );

          _error = true;
          _resStatus = errorService.errors.DATABASE_ERROR.code;
          _message = errorService.errors.DATABASE_ERROR.message;
        }

        const _teamInfo = crypto.encryptData(teamInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _teamInfo,
        });
      }
    );
}

function deleteTeam(req, res, next) {
    var teamId = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;


    connection.query(
      queries.deleteTeam,
      [teamId],
      (error, result) => {
      if (!error) {
      } else {
        errorService.handleError(
          errorService.errors.DATABASE_ERROR.code,
          errorService.errors.DATABASE_ERROR.message,
          error.sqlMessage
        );

        _error = true;
        _resStatus = errorService.errors.DATABASE_ERROR.code;
        _message = errorService.errors.DATABASE_ERROR.message;
      }

      res.status(_resStatus).json({
        error: _error,
        message: _message
      });
    });
}

exports.getTeams = getTeams;
exports.findTeam = findTeam;
exports.createTeam = createTeam;
exports.updateTeam = updateTeam;
exports.deleteTeam = deleteTeam;
