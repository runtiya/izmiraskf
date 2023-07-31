const querystaffizmirtff = require('../../queries/querystaffizmirtff');
const connection = require('../../functions/database').connectDatabase();
const imagesFunction = require('../../functions/images');

function getStaffList(req, res, next) {
  var staffList;
  var message;

  connection.query(
    querystaffizmirtff.getStaffList,
    (error, result) => {
      if (!error) {
        staffList = result;
      }
      else {
        message = error.sqlMessage;
        staffList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Staff fetched successfully!',
        staffList: staffList
      });
    });
}


function createStaff(req, res, next) {
  const staffInfo = JSON.parse(req.body.staffInfo);
  var message;
  var staffId;

  if (!!req.file) {
    const url = req.protocol + "://" + req.get("host");
    const imagePath = imagesFunction.setImagePath(url, "/images/staff/", req.file.filename);
    staffInfo.imagePath = imagePath;
  } else {
    staffInfo.imagePath = null;
  }

  connection.query(
    querystaffizmirtff.createStaff,
    [
      staffInfo.createdAt,
      staffInfo.createdBy,
      staffInfo.updatedAt,
      staffInfo.updatedBy,
      staffInfo.title,
      staffInfo.fullName,
      staffInfo.phone,
      staffInfo.email,
      staffInfo.imagePath,
      staffInfo.isVisible,
      staffInfo.orderNo],
    (error, result) => {
      if (!error) {
        staffId = result.insertId;
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'New Staff created successfully!',
        staffId: staffId
      });
  });

}

function updateStaff(req, res, next) {
  const staffInfo = JSON.parse(req.body.staffInfo);
  var message;

  if (!!req.file) {
    const url = req.protocol + "://" + req.get("host");
    const imagePath = imagesFunction.setImagePath(url, "/images/staff/", req.file.filename);
    staffInfo.imagePath = imagePath;
  } else {
    if (!staffInfo.imagePath) {
      staffInfo.imagePath = null;
    }
  }

  connection.query(
    querystaffizmirtff.updateStaff,
    [
      staffInfo.createdAt,
      staffInfo.createdBy,
      staffInfo.updatedAt,
      staffInfo.updatedBy,
      staffInfo.title,
      staffInfo.fullName,
      staffInfo.phone,
      staffInfo.email,
      staffInfo.imagePath,
      staffInfo.isVisible,
      staffInfo.orderNo,
      staffInfo.id
    ],
    (error, result) => {
      if (!error) {

      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'Staff updated successfully!',
      });
  });
}

function deleteStaff(req, res, next) {
  var staffId =  req.params.id;
  var message;
  connection.query(
    querystaffizmirtff.deleteStaff
    [staffId],
    (error, result) => {
      if (!error) {

      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'Staff deleted successfully!',
      });
  });
}


exports.getStaffList = getStaffList;
exports.createStaff = createStaff;
exports.updateStaff = updateStaff;
exports.deleteStaff = deleteStaff;
