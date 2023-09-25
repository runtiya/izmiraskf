module.exports = {
  "getUsers" : "select * from view_admin_users",
  "getUserById" : "select * from view_admin_users where id = ?",
  "userLogin" : "select * from view_admin_users where username = ? and isactive = ?",
  "createUser" : "insert into users (createdat, createdby, updatedat, updatedby, fullname, username, userpassword, imagepath, usertype, isactive, isdeleted) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  "updateUser" : "update users set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, fullname = ?, imagepath = ?, usertype = ?, isactive = ?, isdeleted = ? where id = ?",
  //"deleteUser" : "delete from users where id = ?"
  "deleteUser" : "update users set isdeleted = true where id = ?"
}
