module.exports = {
  "getWeeklyMatchProgram" : "select * from VIEW_ADMIN_WEEKLYMATCHPROGRAM where seasonid = ?" ,
  "createWeeklyMatchProgram" : "insert into WEEKLYMATCHPROGRAM(createdat, createdby, updatedat, updatedby, seasonid, begindate, enddate, isactive) values (?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateWeeklyMatchProgram" : "update WEEKLYMATCHPROGRAM set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, seasonid = ?, begindate = ?, enddate = ?, isactive = ?  where id = ? and seasonid = ?" ,
  "deleteWeeklyMatchProgram" : "delete from WEEKLYMATCHPROGRAM where id = ? and seasonid = ?" ,
}
