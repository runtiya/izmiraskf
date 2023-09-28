module.exports = {
  "getGroupStages" : "select * from VIEW_ADMIN_GROUPSTAGES where leagueid = ?" ,
  "getWeekSequence" :  "select distinct(f.matchweek) as weekSequence from VIEW_ADMIN_FIXTURES f join GROUPSTAGES g on g.id = f.groupstageid where f.groupstageid = ? order by weekSequence" ,
  "getPlayedLastMatchWeek" : "select max(matchweek) as matchWeek from VIEW_ADMIN_FIXTURES where groupstageid = ? and matchstatus = 'PLAYED'" ,
  "createGroupStage" : "insert into GROUPSTAGES(createdat, createdby, updatedat, updatedby, leagueid, groupname, periodsystem, isactive, orderno) values(?, ?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateGroupStage" : "update GROUPSTAGES set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, leagueid = ?, groupname = ?, periodsystem = ?, isactive = ?, orderno = ? where id = ?" ,
  "deleteGroupStage" : "delete from GROUPSTAGES where id = ?"
}
