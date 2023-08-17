module.exports = {
  "getTeams" : "select * from view_admin_teams" ,
  "getTeamsWithPagination" : "select * from view_admin_teams limit ? offset ?",
  "findTeam" : "" ,
  "createTeam" : "insert into teams(createdat, createdby, updatedat, updatedby, tffclubcode, officialname, shortname, imagepath, city, town, address, longitude, latitude, phonenumber, faxnumber, stadiumid, presidentname, colorcodes, websiteurl, isaskfmember, isvisible) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateTeam" : "update teams set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, tffclubcode = ?, officialname = ?, shortname = ?, imagepath = ?, city = ?, town = ?, address = ?, longitude = ?, latitude = ?, phonenumber = ?, faxnumber = ?, stadiumid = ?, presidentname = ?, colorcodes = ?, websiteurl = ?, isaskfmember = ?, isvisible = ? where id = ?" ,
  "deleteTeam" : "delete from teams where id = ?"
}
