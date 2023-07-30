module.exports = {
  "getWeeklyMatchProgram" : "select * from view_admin_weeklymatchprogram where seasonid = ?" ,
  "createWeeklyMatchProgram" : "insert into weeklymatchprogram(createdat, createdby, updatedat, updatedby, seasonid, begindate, enddate, isactive) values (?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateWeeklyMatchProgram" : "update weeklymatchprogram set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, seasonid = ?, begindate = ?, enddate = ?, isactive = ?  where id = ? and seasonid = ?" ,
  "deleteWeeklyMatchProgram" : "delete from weeklymatchprogram where id = ? and seasonid = ?" ,
}
