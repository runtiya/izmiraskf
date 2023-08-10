const queries = require("../../queries/admin/staffizmirtff");
const connection = require("../../functions/database").connectDatabase();
const crypto = require('../../functions/crypto');
const imagesFunction = require("../../functions/images");

function getStaffList(req, res, next) {
  try {
    var staffList = [];
    var message;

    connection.query(queries.getStaffList, (error, result) => {
      if (!error) {
        staffList = result;
      } else {
        message = error.sqlMessage;
      }

      const _staffList = crypto.encryptData(staffList);

      res.status(200).json({
        data: _staffList,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function createStaff(req, res, next) {
  try {
    const staffInfo = JSON.parse(req.body.staffInfo);
    var message;
    var staffId;

    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const imagePath = imagesFunction.setImagePath(
        url,
        "/images/staff/",
        req.file.filename
      );
      staffInfo.imagePath = imagePath;
    } else {
      staffInfo.imagePath = null;
    }

    connection.query(
      queries.createStaff,
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
      ],
      (error, result) => {
        if (!error) {
          staffId = result.insertId;
        } else {
          message = error.sqlMessage;
        }

        const _staffId = crypto.encryptData(staffId);

        res.status(200).json({
          data: _staffId,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function updateStaff(req, res, next) {
  try {
    const staffInfo = JSON.parse(req.body.staffInfo);
    var message;

    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const imagePath = imagesFunction.setImagePath(
        url,
        "/images/staff/",
        req.file.filename
      );
      staffInfo.imagePath = imagePath;
    } else {
      if (!staffInfo.imagePath) {
        staffInfo.imagePath = null;
      }
    }

    connection.query(
      queries.updateStaff,
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
        staffInfo.id,
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

function deleteStaff(req, res, next) {
  try {
    var staffId = req.params.id;
    var message;
    connection.query(queries.deleteStaff,
      [staffId],
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

exports.getStaffList = getStaffList;
exports.createStaff = createStaff;
exports.updateStaff = updateStaff;
exports.deleteStaff = deleteStaff;
