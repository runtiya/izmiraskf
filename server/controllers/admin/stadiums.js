const queries = require("../../queries/admin/stadiums");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const imagesFunction = require("../../functions/images");
const errorService = require('../../services/error-service.js');

function getStadiums(req, res, next) {
  var stadiumsList = [];
  var stadiumsCount = 0;
  const paginationPageSize = +req.query.paginationPageSize;
  const paginationCurrentPage = +req.query.paginationCurrentPage;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  const stadiumsListPromise = new Promise(async (resolve, reject) => {
    connection.query(
      (!!paginationPageSize && !!paginationCurrentPage) ? queries.getStadiumsWithPagination : queries.getStadiums,
      [
        paginationPageSize,
        (paginationCurrentPage - 1) * paginationPageSize
      ],
      (error, result) => {
        if (!error) {
          stadiumsList = result;
          resolve();
        } else {
          resolve(error);
        }
      });
  });

  const stadiumsCountPromise = new Promise(async (resolve, reject) => {
    connection.query(
      queries.getStadiumsCount,
      (error,result) => {
        if(!error){
          stadiumsCount = result[0].count;
          resolve();
        }else{
          errorService.handleError(
            errorService.errors.DATABASE_ERROR.code,
            errorService.errors.DATABASE_ERROR.message,
            error.sqlMessage
          );

          _error = true;
          _resStatus = errorService.errors.DATABASE_ERROR.code;
          _message = errorService.errors.DATABASE_ERROR.message;

          resolve(error.sqlMessage);
        }
      }
    );
  });

  Promise.all([stadiumsListPromise, stadiumsCountPromise])
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
      const _stadiumsList = crypto.encryptData({stadiumsList: stadiumsList, stadiumsCount: stadiumsCount});

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _stadiumsList,
      });
    });
};


function findStadium(req, res, next) {

}

function createStadium(req, res, next) {
    const stadiumInfo = JSON.parse(req.body.requestData);
    var _resStatus = 200;
    var _error = false;
    var _message = null;
    if (!!req.file) {
      const imagePath = imagesFunction.setImagePath(
        "images/stadiums/",
        req.file.filename
      );
      stadiumInfo.imagePath = imagePath;
    } else {
      stadiumInfo.imagePath = null;
    }

    connection.query(
      queries.createStadium,
      [
        stadiumInfo.createdAt,
        stadiumInfo.createdBy,
        stadiumInfo.updatedAt,
        stadiumInfo.updatedBy,
        stadiumInfo.stadiumName,
        stadiumInfo.city,
        stadiumInfo.town,
        stadiumInfo.address,
        stadiumInfo.phoneNumber,
        stadiumInfo.imagePath,
        stadiumInfo.audienceCapacity,
        stadiumInfo.sizeLength,
        stadiumInfo.sizeWidth,
        stadiumInfo.floorType,
        stadiumInfo.hasLightning,
        stadiumInfo.hasSeating,
        stadiumInfo.hasDisabledTribune,
        stadiumInfo.hasClosedCircuitCameraSystem,
        stadiumInfo.longitude,
        stadiumInfo.latitude,
        stadiumInfo.mapUrl,
        false
      ],
      (error, result) => {
        if (!error) {
          stadiumInfo.id = result.insertId;
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

        const _stadiumInfo = crypto.encryptData(stadiumInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _stadiumInfo,
        });
      }
    );
}

function updateStadium(req, res, next) {
    const stadiumInfo = JSON.parse(req.body.requestData);
    var _resStatus = 200;
    var _error = false;
    var _message = null;
    var stadiumId = req.params.id;

    if (!!req.file) {
      const imagePath = imagesFunction.setImagePath(
        "images/stadiums/",
        req.file.filename
      );
      stadiumInfo.imagePath = imagePath;
    } else {
      if (!stadiumInfo.imagePath) {
        stadiumInfo.imagePath = null;
      }
    }

    connection.query(
      queries.updateStadium,
      [
        stadiumInfo.createdAt,
        stadiumInfo.createdBy,
        stadiumInfo.updatedAt,
        stadiumInfo.updatedBy,
        stadiumInfo.stadiumName,
        stadiumInfo.city,
        stadiumInfo.town,
        stadiumInfo.address,
        stadiumInfo.phoneNumber,
        stadiumInfo.imagePath,
        stadiumInfo.audienceCapacity,
        stadiumInfo.sizeLength,
        stadiumInfo.sizeWidth,
        stadiumInfo.floorType,
        stadiumInfo.hasLightning,
        stadiumInfo.hasSeating,
        stadiumInfo.hasDisabledTribune,
        stadiumInfo.hasClosedCircuitCameraSystem,
        stadiumInfo.longitude,
        stadiumInfo.latitude,
        stadiumInfo.mapUrl,
        false,
        stadiumId || stadiumInfo.id,
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

        const _stadiumInfo = crypto.encryptData(stadiumInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _stadiumInfo,
        });
      }
    );
}

function deleteStadium(req, res, next) {
    var stadiumId = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.deleteStadium,
      [stadiumId],
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

exports.getStadiums = getStadiums;
exports.findStadium = findStadium;
exports.createStadium = createStadium;
exports.updateStadium = updateStadium;
exports.deleteStadium = deleteStadium;
