module.exports = {
  "getGroupStages" : "select * from view_admin_groupstages where leagueid = ?" ,
  "getWeekSequence" :  "select distinct(f.matchweek) as weekSequence from fixtures f join groupstages g on g.id = f.groupstageid where f.groupstageid = ? order by weekSequence" ,
  "getPlayedLastMatchWeek" : "select max(matchweek) as matchWeek from view_admin_fixtures where groupstageid = ? and matchstatus = 'PLAYED'" ,
  "createGroupStage" : "insert into groupstages(createdat, createdby, updatedat, updatedby, leagueid, groupname, periodsystem, isactive, orderno) values(?, ?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateGroupStage" : "update groupstages set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, leagueid = ?, groupname = ?, periodsystem = ?, isactive = ?, orderno = ? where id = ?" ,
  "deleteGroupStage" : "delete from groupstages where id = ?"
}
