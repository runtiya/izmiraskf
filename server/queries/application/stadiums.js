module.exports = {
  "getStadiums" : "select * from VIEW_APPLICATION_STADIUMS view_application_stadiums limit ? offset ?" ,
  "getStadiumById" : "select * from VIEW_APPLICATION_STADIUMS where id = ?",
  "getStadiumsCount" : "select count(1) as 'count' from VIEW_APPLICATION_STADIUMS"
}
