module.exports = {
  "getStaffList" : "select * from VIEW_ADMIN_STAFFITFF" ,
  "createStaff" : "insert into STAFFITFF(createdat, createdby, updatedat, updatedby, title, fullname, phone, email, imagepath, isvisible, orderno) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateStaff" : "update STAFFITFF set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, title = ?, fullname = ?, phone = ?, email = ?, imagepath = ?, isvisible = ?, orderno = ? where id = ?" ,
  "deleteStaff" : "delete from STAFFITFF where id = ?"
}
