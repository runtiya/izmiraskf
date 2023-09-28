module.exports = {
  "getTeams" : "select * from VIEW_APPLICATION_TEAMS",
  "getTeamsWithPagination" : "select * from VIEW_APPLICATION_TEAMS limit ? offset ?",
  "getTeamById" : "select * from VIEW_APPLICATION_TEAMS where id = ?",
  "getTeamsCount" : "select count(1) as 'count' from VIEW_APPLICATION_TEAMS"
}
