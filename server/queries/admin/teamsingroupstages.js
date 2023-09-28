module.exports = {
  "getTeamsInGroupstages" : "select * from VIEW_ADMIN_TEAMSINGROUPSTAGES where groupstageId = ?" ,
  "getTeamsForGroupstages" : "select * from VIEW_ADMIN_TEAMSFORGROUPSTAGES" ,
  "clearTeamsInGroupstages" : "delete from TEAMSINGROUPSTAGES where groupstageId = ?" ,
  "createTeamsInGroupstages" : "insert into TEAMSINGROUPSTAGES(createdat, createdby, updatedat, updatedby, groupstageId, teamid, isexpelled, isreceded, orderno) values(?, ?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateTeamsForGroupstages" : "update TEAMSINGROUPSTAGES set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, isexpelled = ?, isreceded = ?, weekofexpelledorreceded = ?, explanation = ? where id = ?" ,
}
