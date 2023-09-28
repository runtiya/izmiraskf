module.exports = {
  "getTeamsCountByTown" : "select * from VIEW_GLOBAL_STATISTICS_TEAMSCOUNTBYTOWN" ,
  "getStadiumsCountByTown" : "select * from VIEW_GLOBAL_STATISTICS_STADIUMSCOUNTBYTOWN",
  "getStadiumsCountByFloorType" : "select * from VIEW_GLOBAL_STATISTICS_STADIUMSCOUNTBYFLOORTYPE",
  "getMatchStatusCountByLeague" : "select * from VIEW_GLOBAL_STATISTICS_MATCHSTATUSCOUNTBYLEAGUE where seasonid = ?",
  "getSeasonSummaryList" : "select * from VIEW_GLOBAL_STATISTICS_SEASONSUMMARYLIST where seasonid = ?"
}
