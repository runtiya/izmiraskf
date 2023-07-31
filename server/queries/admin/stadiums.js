module.exports = {
  "getStadiums" : "select * from view_admin_stadiums" ,
  "findStadium" : "" ,
  "createStadium" : "insert into stadiums(createdat, createdby, updatedat, updatedby, stadiumname, city, town, address, phonenumber, imagepath, audiencecapacity, sizelength, sizewidth, floortype, haslightning, hasseating, hasdisabledtribune, hasclosedcircuitcamerasystem)values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"  ,
  "updateStadium" : "update stadiums set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, stadiumname = ?, city = ?, town = ?, address = ?, phonenumber = ?, imagepath = ?, audiencecapacity = ?, sizelength = ?, sizewidth = ?, floortype = ?, haslightning = ?, hasseating = ?, hasdisabledtribune = ?, hasclosedcircuitcamerasystem = ? where id = ?" ,
  "deleteStadium" : "delete from stadiums where id = ?"

}
