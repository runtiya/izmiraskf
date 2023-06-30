const connection = require('../../functions/database').connectDatabase();
const imagesFunction = require('../../functions/images');

function getTeams(req, res, next) {
  var teamList;
  var message;

  connection.query(
    "select * from view_admin_teams",
    (error, result) => {
      if (!error) {
        teamList = result;
      } else {
        message = error.sqlMessage;
        teamList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Teams fetched successfully!',
        teamList: teamList
      });
    });
}

// Get a team by id
function findTeam(req, res, next) {

}


function createTeam(req, res, next) {
  const teamInfo = JSON.parse(req.body.teamInfo);
  var message;
  var teamId;

  if (!!req.file) {
    const url = req.protocol + "://" + req.get("host");
    const imagePath = imagesFunction.setImagePath(url, "/images/teams/", req.file.filename);
    teamInfo.imagePath = imagePath;
  } else {
    teamInfo.imagePath = null;
  }

  connection.query(
    "insert into teams(createdat, createdby, updatedat, updatedby, tffclubcode, officialname, shortname, imagepath, city, town, address, longitude, latitude, phonenumber, faxnumber, stadiumid, presidentname, colorcodes, websiteurl, isaskfmember, isvisible) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
      teamInfo.isVisible
    ],
    (error, result) => {
      if (!error) {
        teamId = result.insertId;
      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Team added successfully!',
        teamId: teamId
      });
    });
}


function updateTeam(req, res, next) {
  const teamInfo = JSON.parse(req.body.teamInfo);
  var message;
  var teamId = req.params.id;

  if (!!req.file) {
    const url = req.protocol + "://" + req.get("host");
    const imagePath = imagesFunction.setImagePath(url, "/images/teams/", req.file.filename);
    teamInfo.imagePath = imagePath;
  } else {
    if (!teamInfo.imagePath) {
      teamInfo.imagePath = null;
    }
  }

  connection.query(
    "update teams set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, tffclubcode = ?, officialname = ?, shortname = ?, imagepath = ?, city = ?, town = ?, address = ?, longitude = ?, latitude = ?, phonenumber = ?, faxnumber = ?, stadiumid = ?, presidentname = ?, colorcodes = ?, websiteurl = ?, isaskfmember = ?, isvisible = ? where id = ?",
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
      teamInfo.id || teamId
    ],
    (error, result) => {
      if (!error) {

      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'Team updated successfully!',
      });
    });
}


function deleteTeam(req, res, next) {
  var teamId =  req.params.id;
  var message;
  connection.query(
    "delete from teams where id = ?",
    [teamId],
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


exports.getTeams = getTeams;
exports.findTeam = findTeam;
exports.createTeam = createTeam;
exports.updateTeam = updateTeam;
exports.deleteTeam = deleteTeam;
