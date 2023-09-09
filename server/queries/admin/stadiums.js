module.exports = {
  "getStadiums" : "select * from view_admin_stadiums" ,
  "getStadiumsWithPagination" : "select * from view_admin_stadiums limit ? offset ?",
  "findStadium" : "" ,
  "createStadium" : "insert into stadiums(createdat, createdby, updatedat, updatedby, stadiumname, city, town, address, phonenumber, imagepath, audiencecapacity, sizelength, sizewidth, floortype, haslightning, hasseating, hasdisabledtribune, hasclosedcircuitcamerasystem, longitude, latitude, mapurl)values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"  ,
  "updateStadium" : "update stadiums set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, stadiumname = ?, city = ?, town = ?, address = ?, phonenumber = ?, imagepath = ?, audiencecapacity = ?, sizelength = ?, sizewidth = ?, floortype = ?, haslightning = ?, hasseating = ?, hasdisabledtribune = ?, hasclosedcircuitcamerasystem = ?, longitude = ?, latitude = ?, mapurl = ? where id = ?" ,
  "deleteStadium" : "delete from stadiums where id = ?"

}
