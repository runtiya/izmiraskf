const queries = require("../../queries/admin/staffizmiraskf");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const imagesFunction = require("../../functions/images");
const errorService = require('../../services/error-service.js');

function getStaffList(req, res, next) {
    var staffList = [];
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(queries.getStaffList,
      (error, result) => {
      if (!error) {
        staffList = result;
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

      const _staffList = crypto.encryptData(staffList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _staffList,
      });
    });
}

function createStaff(req, res, next) {
    const staffInfo = JSON.parse(req.body.requestData);
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    if (!!req.file) {
      const imagePath = imagesFunction.setImagePath(
        "images/staff/",
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
          staffInfo.id = result.insertId;
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

        const _staffInfo = crypto.encryptData(staffInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _staffInfo,
        });
      }
    );
}

function updateStaff(req, res, next) {
    const staffInfo = JSON.parse(req.body.requestData);
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    if (!!req.file) {
      const imagePath = imagesFunction.setImagePath(
        "images/staff/",
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
          errorService.handleError(
            errorService.errors.DATABASE_ERROR.code,
            errorService.errors.DATABASE_ERROR.message,
            error.sqlMessage
          );

          _error = true;
          _resStatus = errorService.errors.DATABASE_ERROR.code;
          _message = errorService.errors.DATABASE_ERROR.message;
        }

        const _staffInfo = crypto.encryptData(staffInfo);

        res.status(_resStatus).json({
          error: _error,
          message: _message,
          data: _staffInfo,
        });
      }
    );
}

function deleteStaff(req, res, next) {
    var staffId = req.params.id;
    var _resStatus = 200;
    var _error = false;
    var _message = null;

    connection.query(
      queries.deleteStaff,
      [staffId],
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

exports.getStaffList = getStaffList;
exports.createStaff = createStaff;
exports.updateStaff = updateStaff;
exports.deleteStaff = deleteStaff;
