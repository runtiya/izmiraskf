const connection = require("../../functions/database").connectDatabase();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('../../functions/crypto');

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
  const userInfo = req.body;
  const _password = userInfo.userPassword;
  var message;
  var userId;

  try {
    bcrypt
      .hash(_password, 10)
      .then((hashPassword) => {
        userInfo.userPassword = hashPassword;
      })
      .then(() => {
        connection.query(
          "insert into users (createdat, createdby, updatedat, updatedby, fullname, username, userpassword, profilephoto, usertype, isactive) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            userInfo.createdAt,
            userInfo.createdBy,
            userInfo.updatedAt,
            userInfo.updatedBy,
            userInfo.fullName,
            userInfo.userName,
            userInfo.userPassword,
            userInfo.profilePhoto,
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
    const userInfo = req.body;
    const userId = req.params.id;
    var _error = false;
    var message;
    var _user;

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
              connection.query(
                "update users set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, fullname = ?, profilephoto = ?, usertype = ?, isactive = ? where id = ?",
                [
                  userInfo.createdAt,
                  userInfo.createdBy,
                  userInfo.updatedAt,
                  userInfo.updatedBy,
                  userInfo.fullName,
                  userInfo.profilePhoto,
                  userInfo.userType,
                  userInfo.isActive,
                  userInfo.id,
                ],
                (error, result) => {
                  if (!error) {
                  } else {
                    message = error.sqlMessage;
                  }
                }
              );
            } else {
              //Wrong Password
              _error = true;
              (message = "User Authentication failed!"),
                (snackBarMessage = "Hatalı Şifre girdiniz!");
            }
          } else {
            // Wrong Username - not possible in this case
            _error = true;
            (message = "User Authentication failed!"),
              (snackBarMessage = "Hatalı Kullanıcı Adı girdiniz!");
          }
        } else {
          // System error
          _error = true;
          message = error.sqlMessage;
        }

        res.status(200).json({
          snackBarMessage: snackBarMessage,
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
    var expiresIn;
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

        res.status(200).json({
          snackBarMessage: snackBarMessage,
          token: token,
          expiresIn: 3600,
          user: _user,
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
