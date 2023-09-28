module.exports = {
  "getSeasons" : "select * from VIEW_ADMIN_SEASONS" ,
  "createSeason" : "insert into SEASONS(createdat, createdby, updatedat, updatedby, seasonname, seasonyear, isactive)values (?, ?, ?, ?, ?, ?, ?)" ,
  "updateSeason" : "update SEASONS set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, seasonname = ?, seasonyear = ?, isactive = ? where id = ?" ,
  "deleteSeason" : "delete from SEASONS where id = ?"
}
