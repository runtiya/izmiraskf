const queries = require("../../queries/admin/stadiums");
const connection = require("../../functions/database").connectDatabase();
const imagesFunction = require("../../functions/images");

function getStadiums(req, res, next) {
  try {
    var stadiumList;
    var message;

    connection.query(queries.getStadiums, (error, result) => {
      if (!error) {
        stadiumList = result;
      } else {
        message = error.sqlMessage;
        stadiumList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || "Stadiums fetched successfully!",
        stadiums: stadiumList,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

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
      ],
      (error, result) => {
        if (!error) {
          stadiumId = result.insertId;
        } else {
          message = error.sqlMessage;
        }
        res.status(200).json({
          stadiumId: stadiumId,
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
        stadiumId || stadiumInfo.id,
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

function deleteStadium(req, res, next) {
  try {
    var stadiumId = req.params.id;
    var message;
    connection.query(queries.deleteStadium, [stadiumId], (error, result) => {
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

exports.getStadiums = getStadiums;
exports.findStadium = findStadium;
exports.createStadium = createStadium;
exports.updateStadium = updateStadium;
exports.deleteStadium = deleteStadium;
