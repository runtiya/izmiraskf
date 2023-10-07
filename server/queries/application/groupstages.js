module.exports = {
  "getGroupStages" : "select * from VIEW_APPLICATION_GROUPSTAGES where leagueid = ?" ,
  "getWeekSequence" : "select distinct(f.matchweek) as weekSequence from VIEW_APPLICATION_FIXTURES f join VIEW_APPLICATION_GROUPSTAGES g on g.id = f.groupstageid where f.groupstageid = ? order by weekSequence" ,
  "getPlayedLastMatchWeek" : "select max(matchweek) as matchWeek from VIEW_APPLICATION_FIXTURES where groupstageid = ? and matchstatus = 'PLAYED'"
}
