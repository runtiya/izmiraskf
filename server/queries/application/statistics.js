module.exports = {
  "getTeamsCountByTown" : "select * from view_global_statistics_teamscountbytown" ,
  "getStadiumsCountByTown" : "select * from view_global_statistics_stadiumscountbytown",
  "getStadiumsCountByFloorType" : "select * from view_global_statistics_stadiumscountbyfloortype",
  "getMatchStatusCountByLeague" : "select * from view_global_statistics_matchstatuscountbyleague where seasonid = ?"
}
