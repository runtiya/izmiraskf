module.exports = {
  "getStaffList" : "select * from VIEW_ADMIN_STAFFIASKF" ,
  "createStaff" : "insert into STAFFIASKF(createdat, createdby, updatedat, updatedby, title, fullname, phone, email, imagepath, isvisible, orderno) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateStaff" : "update STAFFIASKF set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, title = ?, fullname = ?, phone = ?, email = ?, imagepath = ?, isvisible = ?, orderno = ? where id = ?" ,
  "deleteStaff" : "delete from STAFFIASKF where id = ?"
}
