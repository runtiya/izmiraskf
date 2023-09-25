module.exports = {
  "getStadiums" : "select * from view_admin_stadiums" ,
  "getStadiumsWithPagination" : "select * from view_admin_stadiums limit ? offset ?",
  "getStadiumsCount" : "select count(1) as 'count' from view_admin_stadiums",
  "findStadium" : "" ,
  "createStadium" : "insert into stadiums(createdat, createdby, updatedat, updatedby, stadiumname, city, town, address, phonenumber, imagepath, audiencecapacity, sizelength, sizewidth, floortype, haslightning, hasseating, hasdisabledtribune, hasclosedcircuitcamerasystem, longitude, latitude, mapurl, isdeleted)values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"  ,
  "updateStadium" : "update stadiums set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, stadiumname = ?, city = ?, town = ?, address = ?, phonenumber = ?, imagepath = ?, audiencecapacity = ?, sizelength = ?, sizewidth = ?, floortype = ?, haslightning = ?, hasseating = ?, hasdisabledtribune = ?, hasclosedcircuitcamerasystem = ?, longitude = ?, latitude = ?, mapurl = ?, isdeleted = ? where id = ?" ,
  //"deleteStadium" : "delete from stadiums where id = ?"
  "deleteStadium" : "update stadiums set isdeleted = true where id = ?"

}
