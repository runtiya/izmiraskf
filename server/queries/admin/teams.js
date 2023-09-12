module.exports = {
  "getTeams" : "select * from view_admin_teams" ,
  "getTeamsWithPagination" : "select * from view_admin_teams limit ? offset ?",
  "getTeamsCount" : "select count(1) as 'count' from view_admin_teams",
  "findTeam" : "" ,
  "createTeam" : "insert into teams(createdat, createdby, updatedat, updatedby, tffclubcode, officialname, shortname, imagepath, city, town, address, phonenumber, faxnumber, stadiumid, presidentname, colorcodes, websiteurl, isaskfmember, isvisible, longitude, latitude, mapurl) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateTeam" : "update teams set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, tffclubcode = ?, officialname = ?, shortname = ?, imagepath = ?, city = ?, town = ?, address = ?, phonenumber = ?, faxnumber = ?, stadiumid = ?, presidentname = ?, colorcodes = ?, websiteurl = ?, isaskfmember = ?, isvisible = ?, longitude = ?, latitude = ?, mapurl = ? where id = ?" ,
  "deleteTeam" : "delete from teams where id = ?"
}
