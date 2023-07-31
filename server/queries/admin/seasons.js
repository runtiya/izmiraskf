module.exports = {
  "getSeasons" : "select * from view_admin_seasons" ,
  "createSeason" : "insert into seasons(createdat, createdby, updatedat, updatedby, seasonname, seasonyear, isactive)values (?, ?, ?, ?, ?, ?, ?)" ,
  "updateSeason" : "update seasons set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, seasonname = ?, seasonyear = ?, isactive = ?  where id = ?" ,
  "deleteSeason" : "delete from seasons where id = ?"
}
