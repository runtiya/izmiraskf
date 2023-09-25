const queries = require('../../queries/admin/authentication.js');
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('../../functions/crypto');
const imagesFunction = require("../../functions/images");
const errorService = require('../../services/error-service.js');
const environment = require("../../environments/development.js");

function getUsers(req, res, next) {
  var usersList = [];
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getUsers,
    [],
    (error, result) => {
      if (!error) {
        usersList = result;
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

      const _usersList = crypto.encryptData(usersList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _usersList,
      });
  });
}

function createUser(req, res, next) {
  const userInfo = JSON.parse(req.body.userInfo);
  const _password = userInfo.userPassword;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  if (!!req.file) {
    const url = req.protocol + "://" + req.get("host");
    const imagePath = imagesFunction.setImagePath(
      url,
      "/images/users/",
      req.file.filename
    );
    userInfo.imagePath = imagePath;
  } else {
    if (!userInfo.imagePath) {
      userInfo.imagePath = null;
    }
  }

  try {
    bcrypt
      .hash(_password, 10)
      .then((hashPassword) => {
        userInfo.userPassword = hashPassword;
      })
      .then(() => {
        connection.query(
          queries.createUser,
          [
            userInfo.createdAt,
            userInfo.createdBy,
            userInfo.updatedAt,
            userInfo.updatedBy,
            userInfo.fullName,
            userInfo.userName,
            userInfo.userPassword,
            userInfo.imagePath,
            userInfo.userType,
            userInfo.isActive,
            false
          ],
          (error, result) => {
            if (!error) {
              userInfo.id = result.insertId;
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

            const _userInfo = crypto.encryptData(userInfo);

            res.status(_resStatus).json({
              error: _error,
              message: _message,
              data: _userInfo,
            });
          }
        );
      });
  } catch (error) {
    errorService.handleError(
      errorService.errors.DATABASE_ERROR.code,
      errorService.errors.DATABASE_ERROR.message,
      error.sqlMessage
    );
    _error = true;
    _resStatus = errorService.errors.DATABASE_ERROR.code;
    _message = errorService.errors.DATABASE_ERROR.message;

    res.status(_resStatus).json({
      error: _error,
      message: _message,
      user: userInfo,
    });
  }
}

function updateUser(req, res, next) {
  const userInfo = JSON.parse(req.body.userInfo);
  const userId = req.params.id;
  var _resStatus = 200;
  var _error = false;
  var _message = null;
  var _user;
  var snackBarMessage;

  if (!!req.file) {
    const url = req.protocol + "://" + req.get("host");
    const imagePath = imagesFunction.setImagePath(
      url,
      "/images/users/",
      req.file.filename
    );
    userInfo.imagePath = imagePath;
  } else {
    if (!userInfo.imagePath) {
      userInfo.imagePath = null;
    }
  }

  connection.query(
    queries.getUserById,
    [userInfo.id],
    async (error, result) => {
      if (!error) {
        _user = result[0] || null;
        if (_user) {
          let isValidCredential = await bcrypt.compare(
            userInfo.userPassword,
            _user.userPassword
          );
          if (isValidCredential) {
            const result = await new Promise((resolve, reject) => {
              connection.query(
                queries.updateUser,
                [
                  userInfo.createdAt,
                  userInfo.createdBy,
                  userInfo.updatedAt,
                  userInfo.updatedBy,
                  userInfo.fullName,
                  userInfo.imagePath,
                  userInfo.userType,
                  userInfo.isActive,
                  false,
                  userInfo.id,
                ],
                (error, result) => {
                  if (!error) {
                    snackBarMessage = "server.success";
                    resolve(result);
                  } else {
                    snackBarMessage = "server.error";
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
          } else {
            //Wrong Password
            _error = true;
            _message = "User Authentication failed!";
            snackBarMessage = "login.wrong.password";
          }
        } else {
          // Wrong Username - not possible in this case
          _error = true;
          _message = "User Authentication failed!";
          snackBarMessage = "login.failure";
        }
      } else {
        // System error
        _error = true;
        _message = error.sqlMessage;
        snackBarMessage = "system.error"
      }

      const _data = crypto.encryptData({
        error: _error,
        message: _message,
        snackBarMessage: snackBarMessage,
        userInfo: userInfo
      });

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _data
      });
    }
  );
}

function userLogin(req, res, next) {
  let fetchedUser = null;
  const userInfo = req.body;
  var snackBarMessage;
  var token;
  var expiresIn = 3600;
  var _user;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.userLogin,
    [userInfo.userName, true],
    async (error, result) => {
      if (!error) {
        _user = result[0] || null;
        if (_user) {
          let isValidCredential = await bcrypt.compare(
            userInfo.userPassword,
            _user.userPassword
          );
          if (isValidCredential) {
            token = jwt.sign(
              { email: _user.userName, userId: _user.id },
              environment.jwtSecretKey,
              { expiresIn: "1h" }
            );
          } else {
            // Wrong password
            _error = true;
            _message = "User Authentication failed!";
            snackBarMessage = "Hatalı Kullanıcı Adı veya Şifre girdiniz!";
          }
        } else {
          // Wrong username
          _error = true;
          _message = "User Authentication failed!";
          snackBarMessage = "Hatalı Kullanıcı Adı veya Şifre girdiniz!";
        }
      } else {
        // System error
        _resStatus = errorService.errors.DATABASE_ERROR.code;
        _message = errorService.errors.DATABASE_ERROR.message;
        _error = true;
      }

      const _data = crypto.encryptData({
        error: _error,
        snackBarMessage: snackBarMessage,
        token: token,
        expiresIn: 3600,
        user: _user
      });

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _data
      });
    }
  );
}

function deleteUser(req, res, next) {
  const userId = req.params.id;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.deleteUser,
    [userId],
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
        message: _message,
      });
    }
  );
}

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.userLogin = userLogin;
exports.deleteUser = deleteUser;
