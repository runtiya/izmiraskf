const connection = require('../../functions/database').connectDatabase();


function getStadiums(req, res, next) {
  var stadiumList;
  var message;

  connection.query(
    "select * from view_admin_stadiums",
    (error, result) => {
      if (!error) {
        stadiumList = result;
      } else {
        message = error.sqlMessage;
        stadiumList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Stadiums fetched successfully!',
        stadiums: stadiumList
      });
    });

}


// Get a stadium by id
function findStadium(req, res, next) {

}


function createStadium(req, res, next) {
  const stadiumInfo = req.body;
  var message;
  var stadiumId;
  connection.query(
    "insert into stadiums(createdat, createdby, updatedat, updatedby, stadiumname, city, town, address, stadiumimage, audiencecapacity, sizelength, sizewidth, floortype, haslightning, hasseating, hasdisabledtribune, hasclosedcircuitcamerasystem)values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      stadiumInfo.createdAt,
      stadiumInfo.createdBy,
      stadiumInfo.updatedAt,
      stadiumInfo.updatedBy,
      stadiumInfo.stadiumName,
      stadiumInfo.city,
      stadiumInfo.town,
      stadiumInfo.address,
      stadiumInfo.stadiumImage,
      stadiumInfo.audienceCapacity,
      stadiumInfo.sizeLength,
      stadiumInfo.sizeWidth,
      stadiumInfo.floorType,
      stadiumInfo.hasLightning,
      stadiumInfo.hasSeating,
      stadiumInfo.hasDisabledTribune,
      stadiumInfo.hasClosedCircuitCameraSystem
    ],
    (error, result) => {
      if (!error) {
        stadiumId = result.insertId;
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'Stadium added successfully!',
        stadiumId: stadiumId
      });
    });
}


function updateStadium(req, res, next) {
  const stadiumInfo = req.body;
  var message;
  connection.query(
    "update stadiums set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, stadiumname = ?, city = ?, town = ?, address = ?, stadiumimage = ?, audiencecapacity = ?, sizelength = ?, sizewidth = ?, floortype = ?, haslightning = ?, hasseating = ?, hasdisabledtribune = ?, hasclosedcircuitcamerasystem = ? where id = ?",
    [
      stadiumInfo.createdAt,
      stadiumInfo.createdBy,
      stadiumInfo.updatedAt,
      stadiumInfo.updatedBy,
      stadiumInfo.stadiumName,
      stadiumInfo.city,
      stadiumInfo.town,
      stadiumInfo.address,
      stadiumInfo.stadiumImage,
      stadiumInfo.audienceCapacity,
      stadiumInfo.sizeLength,
      stadiumInfo.sizeWidth,
      stadiumInfo.floorType,
      stadiumInfo.hasLightning,
      stadiumInfo.hasSeating,
      stadiumInfo.hasDisabledTribune,
      stadiumInfo.hasClosedCircuitCameraSystem,
      stadiumInfo.id
    ],
    (error, result) => {
      if (!error) {

      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'Stadium updated successfully!'
      });
    });
}


function deleteStadium(req, res, next) {
  var stadiumId =  req.params.id;
  var message;
  connection.query(
    "delete from stadiums where id = ?",
    [stadiumId],
    (error, result) => {
      if (!error) {

      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'Stadium deleted successfully!',
      });
  });
}


exports.getStadiums = getStadiums;
exports.findStadium = findStadium;
exports.createStadium = createStadium;
exports.updateStadium = updateStadium;
exports.deleteStadium = deleteStadium;
