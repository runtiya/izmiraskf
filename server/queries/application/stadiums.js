module.exports = {
  "getStadiums" : "select * from VIEW_APPLICATION_STADIUMS",
  "getStadiumsWithPagination" : "select * from VIEW_APPLICATION_STADIUMS limit ? offset ?",
  "getStadiumById" : "select * from VIEW_APPLICATION_STADIUMS where id = ?",
  "getStadiumsCount" : "select count(1) as 'count' from VIEW_APPLICATION_STADIUMS"
}
