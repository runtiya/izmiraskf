module.exports = {
  "getTeams" : "select * from VIEW_ADMIN_TEAMS" ,
  "getTeamsWithPagination" : "select * from VIEW_ADMIN_TEAMS limit ? offset ?",
  "getTeamsCount" : "select count(1) as 'count' from VIEW_ADMIN_TEAMS",
  "findTeam" : "" ,
  "createTeam" : "insert into TEAMS(createdat, createdby, updatedat, updatedby, tffclubcode, officialname, shortname, imagepath, city, town, address, phonenumber, faxnumber, stadiumid, presidentname, colorcodes, websiteurl, isaskfmember, isvisible, longitude, latitude, mapurl, isdeleted) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateTeam" : "update TEAMS set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, tffclubcode = ?, officialname = ?, shortname = ?, imagepath = ?, city = ?, town = ?, address = ?, phonenumber = ?, faxnumber = ?, stadiumid = ?, presidentname = ?, colorcodes = ?, websiteurl = ?, isaskfmember = ?, isvisible = ?, longitude = ?, latitude = ?, mapurl = ?, isdeleted = ? where id = ?" ,
  //"deleteTeam" : "delete from TEAMS where id = ?"
  "deleteTeam" : "update TEAMS set isdeleted = true where id = ?"
}
