module.exports = {
  "getStaffList" : "select * from view_admin_staffitff" ,
  "createStaff" : "insert into staffitff(createdat, createdby, updatedat, updatedby, title, fullname, phone, email, imagepath, isvisible, orderno) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateStaff" : "update staffitff set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, title = ?, fullname = ?, phone = ?, email = ?, imagepath = ?, isvisible = ?, orderno = ? where id = ?" ,
  "deleteStaff" : "delete from staffitff where id = ?"
}
