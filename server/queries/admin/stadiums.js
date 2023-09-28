module.exports = {
  "getStadiums" : "select * from VIEW_ADMIN_STADIUMS" ,
  "getStadiumsWithPagination" : "select * from VIEW_ADMIN_STADIUMS limit ? offset ?",
  "getStadiumsCount" : "select count(1) as 'count' from VIEW_ADMIN_STADIUMS",
  "findStadium" : "" ,
  "createStadium" : "insert into STADIUMS(createdat, createdby, updatedat, updatedby, stadiumname, city, town, address, phonenumber, imagepath, audiencecapacity, sizelength, sizewidth, floortype, haslightning, hasseating, hasdisabledtribune, hasclosedcircuitcamerasystem, longitude, latitude, mapurl, isdeleted)values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"  ,
  "updateStadium" : "update STADIUMS set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, stadiumname = ?, city = ?, town = ?, address = ?, phonenumber = ?, imagepath = ?, audiencecapacity = ?, sizelength = ?, sizewidth = ?, floortype = ?, haslightning = ?, hasseating = ?, hasdisabledtribune = ?, hasclosedcircuitcamerasystem = ?, longitude = ?, latitude = ?, mapurl = ?, isdeleted = ? where id = ?" ,
  //"deleteStadium" : "delete from STADIUMS where id = ?"
  "deleteStadium" : "update STADIUMS set isdeleted = true where id = ?"

}
