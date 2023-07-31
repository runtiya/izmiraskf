module.exports = {
  "getStaffList" : "select * from view_admin_staffiaskf" ,
  "createStaff" : "insert into staffiaskf(createdat, createdby, updatedat, updatedby, title, fullname, phone, email, imagepath, isvisible, orderno) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateStaff" : "update staffiaskf set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, title = ?, fullname = ?, phone = ?, email = ?, imagepath = ?, isvisible = ?, orderno = ? where id = ?" ,
  "deleteStaff" : "delete from staffiaskf where id = ?"
}
