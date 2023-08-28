const connection = require("../../functions/database").connectDatabase();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('../../functions/crypto');
const imagesFunction = require("../../functions/images");

function getUsers(req, res, next) {
  try {
    var usersList = [];
    var message;

    connection.query("select * from view_admin_users", [], (error, result) => {
      if (!error) {
        usersList = result;
      } else {
        message = error.sqlMessage;
      }

      const _usersList = crypto.encryptData(usersList);

      res.status(200).json({
        data: _usersList,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function createUser(req, res, next) {
  const userInfo = JSON.parse(req.body.userInfo);
  const _password = userInfo.userPassword;
  var message;
  var userId;

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
          "insert into users (createdat, createdby, updatedat, updatedby, fullname, username, userpassword, imagepath, usertype, isactive) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
          ],
          (error, result) => {
            if (!error) {
              userId = result.insertId;
              userInfo.id = userId;
            } else {
              message = error.sqlMessage;
            }

            const _userInfo = crypto.encryptData(userInfo);

            res.status(200).json({
              data: _userInfo,
            });
          }
        );
      });
  } catch (error) {
    res.status(200).json({
      user: userInfo,
    });
  }
}

function updateUser(req, res, next) {
  try {
    const userInfo = JSON.parse(req.body.userInfo);
    const userId = req.params.id;
    var _error = false;
    var message;
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
      "select * from view_admin_users where id = ?",
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
                  "update users set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, fullname = ?, imagepath = ?, usertype = ?, isactive = ? where id = ?",
                  [
                    userInfo.createdAt,
                    userInfo.createdBy,
                    userInfo.updatedAt,
                    userInfo.updatedBy,
                    userInfo.fullName,
                    userInfo.imagePath,
                    userInfo.userType,
                    userInfo.isActive,
                    userInfo.id,
                  ],
                  (error, result) => {
                    if (!error) {
                      snackBarMessage = "server.success";
                      resolve(result);
                    } else {
                      snackBarMessage = "server.error";
                      message = error.sqlMessage;
                      resolve(message);
                    }

                  }
                );
              });
            } else {
              //Wrong Password
              _error = true;
              message = "User Authentication failed!";
              snackBarMessage = "login.wrong.password";
            }
          } else {
            // Wrong Username - not possible in this case
            _error = true;
            message = "User Authentication failed!";
            snackBarMessage = "login.failure";
          }
        } else {
          // System error
          _error = true;
          message = error.sqlMessage;
          snackBarMessage = "system.error"
        }

        const _data = crypto.encryptData({
          error: _error,
          message: message,
          snackBarMessage: snackBarMessage,
          userInfo: userInfo
        });

        res.status(200).json({
          data: _data
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function userLogin(req, res, next) {
  try {
    let fetchedUser = null;
    const userInfo = req.body;
    var message;
    var snackBarMessage;
    var token;
    var expiresIn = 3600;
    var _user;
    var _error = false;

    connection.query(
      "select * from view_admin_users where username = ? and isactive = ?",
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
                "secret_this_should_be_longer",
                { expiresIn: "1h" }
              );
            } else {
              // Wrong password
              _error = true;
              message = "User Authentication failed!";
              snackBarMessage = "Hatalı Kullanıcı Adı veya Şifre girdiniz!";
            }
          } else {
            // Wrong username
            _error = true;
            message = "User Authentication failed!";
            snackBarMessage = "Hatalı Kullanıcı Adı veya Şifre girdiniz!";
          }
        } else {
          // System error
          _error = true;
          message = error.sqlMessage;
        }

        const _data = crypto.encryptData({
          error: _error,
          snackBarMessage: snackBarMessage,
          token: token,
          expiresIn: 3600,
          user: _user
        });

        res.status(200).json({
          data: _data
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function deleteUser(req, res, next) {
  try {
    const userId = req.params.id;
    var message;

    connection.query(
      "delete from users where id = ?",
      [userId],
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

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.userLogin = userLogin;
exports.deleteUser = deleteUser;
