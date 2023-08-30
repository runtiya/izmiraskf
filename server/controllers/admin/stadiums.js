const queries = require("../../queries/admin/stadiums");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const imagesFunction = require("../../functions/images");

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
        (!!paginationPageSize && !!paginationCurrentPage) ? queries.getStadiumsWithPagination : queries.getStadiums,
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
      })
    });

    stadiumsCount = await new Promise((resolve, reject) => {
      connection.query(
        "select count(1) as 'count' from view_admin_stadiums",
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
  }catch (error) {
    console.log(error);
    res.status(500).json({
      message: error
    });
}

})()
};

// Get a stadium by id
function findStadium(req, res, next) {
  // There isn't any select query.
}

function createStadium(req, res, next) {
  try {
    const stadiumInfo = JSON.parse(req.body.stadiumInfo);
    var message;
    var stadiumId;

    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const imagePath = imagesFunction.setImagePath(
        url,
        "/images/stadiums/",
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
        stadiumInfo.mapUrl
      ],
      (error, result) => {
        if (!error) {
          stadiumId = result.insertId;
          stadiumInfo.id = stadiumId;
        } else {
          message = error.sqlMessage;
        }

        const _stadiumInfo = crypto.encryptData(stadiumInfo);

        res.status(200).json({
          data: _stadiumInfo,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function updateStadium(req, res, next) {
  try {
    const stadiumInfo = JSON.parse(req.body.stadiumInfo);
    var message;
    var stadiumId = req.params.id;

    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const imagePath = imagesFunction.setImagePath(
        url,
        "/images/stadiums/",
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
        stadiumId || stadiumInfo.id,
      ],
      (error, result) => {
        if (!error) {
        } else {
          message = error.sqlMessage;
        }

        const _stadiumInfo = crypto.encryptData(stadiumInfo);

        res.status(200).json({
          data: _stadiumInfo,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function deleteStadium(req, res, next) {
  try {
    var stadiumId = req.params.id;
    var message;
    connection.query(
      queries.deleteStadium,
      [stadiumId],
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

exports.getStadiums = getStadiums;
exports.findStadium = findStadium;
exports.createStadium = createStadium;
exports.updateStadium = updateStadium;
exports.deleteStadium = deleteStadium;
