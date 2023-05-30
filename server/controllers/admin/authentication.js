const connection = require('../../functions/database').connectDatabase();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function getUsers(req, res, next) {

  var usersList = [];
  var message;

  connection.query(
    "select * from view_admin_users",
    [],
    (error, result) => {
      if (!error) {
        usersList = result;
      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Users fetched successfully!',
        usersList: usersList
      });
    }
  )
}


function createUser(req, res, next) {
  const userInfo = req.body;
  const _password = userInfo.userPassword;
  var message;

  try {
    bcrypt.hash(_password, 10)
      .then(hashPassword => {
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
            userInfo.isActive
          ],
          (error, result) => {
            if (!error) {

            } else {
              message = error.sqlMessage;
            }

            res.status(200).json({
              error: !!error,
              message: message || 'User created successfully!',
              user: userInfo
            });
          }
        );
      });
  } catch (error) {

    res.status(200).json({
      error: !!error,
      message: error,
      user: userInfo
    });
  }
}

function userLogin(req, res, next) {
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
    [
      userInfo.userName,
      true
    ],
    async (error, result) => {
      if (!error) {
        _user = result[0] || null;
        if (_user) {
          let isValidCredential = await bcrypt.compare(userInfo.userPassword, _user.userPassword);
          if (isValidCredential) {
            token = jwt.sign({ email: _user.userName, userId: _user.id }, "secret_this_should_be_longer", { expiresIn: "1h" });
          } else {
            // Wrong password
            _error = true;
            message = 'User Authentication failed!';
            snackBarMessage = 'Hatalı Kullanıcı Adı veya Şifre girdiniz!';
          }
        } else {
          // Wrong username
          _error = true;
          message = 'User Authentication failed!';
          snackBarMessage = 'Hatalı Kullanıcı Adı veya Şifre girdiniz!';
        }
      } else {
        // System error
        _error = true;
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: _error,
        message: message || 'Authentication confirmed successfully!',
        snackBarMessage: snackBarMessage,
        token: token,
        expiresIn: 3600,
        user: _user
      });
    }
  );
}

function deleteUser(req, res, next) {
  const userId = req.params.id;
  var message;

  connection.query(
    "delete from users where id = ?",
    [
      userId
    ],
    (error, result) => {
      if (!error) {

      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'User deleted successfully!'
    });
    }
  )
}

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.userLogin = userLogin;
exports.deleteUser = deleteUser;
