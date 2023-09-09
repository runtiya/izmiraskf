module.exports = {
  "getTeamsInGroupstages" : "select * from view_admin_teamsingroupstages where groupstageId = ?" ,
  "getTeamsForGroupstages" : "select * from view_admin_teamsforgroupstages" ,
  "clearTeamsInGroupstages" : "delete from teamsingroupstages where groupstageId = ?" ,
  "createTeamsInGroupstages" : "insert into teamsingroupstages(createdat, createdby, updatedat, updatedby, groupstageId, teamid, isexpelled, isreceded, orderno) values(?, ?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateTeamsForGroupstages" : "update teamsingroupstages set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, isexpelled = ?, isreceded = ?, weekofexpelledorreceded = ?, explanation = ? where id = ?" ,
}
