module.exports = {
  "getLeagues" : "select * from VIEW_ADMIN_LEAGUES where seasonid = ?" ,
  "createLeague" : "insert into LEAGUES(createdat, createdby, updatedat, updatedby, seasonid, leaguename, category, leaguetype, isactive, orderno) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateLeague" : "update LEAGUES set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, seasonid = ?, leaguename = ?, category = ?, leaguetype = ?, isactive = ?, orderno = ? where id = ?" ,
  "deleteLeague" : "delete from LEAGUES where id = ?"
}
