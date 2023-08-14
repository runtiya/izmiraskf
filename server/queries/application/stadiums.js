module.exports = {
  "getStadiums" : "select * from view_application_stadiums limit ? offset ?" ,
  "getStadiumById" : "select * from view_application_stadiums where id = ?"
}
