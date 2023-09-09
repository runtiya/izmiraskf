module.exports = {
  "getTeams" : "select * from view_application_teams",
  "getTeamsWithPagination" : "select * from view_application_teams limit ? offset ?",
  "getTeamById" : "select * from view_application_teams where id = ?",
  "getTeamsCount" : "select count(1) as 'count' from view_application_teams"
}
