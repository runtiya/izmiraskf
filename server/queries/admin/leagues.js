module.exports = {
  "getLeagues" : "select * from view_admin_leagues where seasonid = ?" ,
  "createLeague" : "insert into leagues(createdat, createdby, updatedat, updatedby, seasonid, leaguename, category, leaguetype, isactive, orderno) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateLeague" : "update leagues set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, seasonid = ?, leaguename = ?, category = ?, leaguetype = ?, isactive = ?, orderno = ? where id = ?" ,
  "deleteLeague" : "delete from leagues where id = ?"
}
