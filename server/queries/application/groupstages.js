module.exports = {
  "getGroupStages" : "select * from view_application_groupstages where leagueid = ?" ,
  "getWeekSequence" : "select distinct(f.matchweek) as weekSequence from fixtures f join groupstages g on g.id = f.groupstageid where f.groupstageid = ? order by weekSequence" ,
  "getPlayedLastMatchWeek" : "select max(matchweek) as matchWeek from view_application_fixtures where groupstageid = ? and matchstatus = 'PLAYED'"
}
