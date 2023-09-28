module.exports = {
  "getUsers" : "select * from VIEW_ADMIN_USERS",
  "getUserById" : "select * from VIEW_ADMIN_USERS where id = ?",
  "userLogin" : "select * from VIEW_ADMIN_USERS where username = ? and isactive = ?",
  "createUser" : "insert into USERS (createdat, createdby, updatedat, updatedby, fullname, username, userpassword, imagepath, usertype, isactive, isdeleted) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  "updateUser" : "update USERS set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, fullname = ?, imagepath = ?, usertype = ?, isactive = ?, isdeleted = ? where id = ?",
  //"deleteUser" : "delete from users where id = ?"
  "deleteUser" : "update USERS set isdeleted = true where id = ?"
}
