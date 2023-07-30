module.exports = {
  "getWeeklyMatchList" : "select * from view_admin_weeklymatchlist where weeklymatchprogramid = ?",
  "createWeeklyMatchList" : "insert into weeklymatchlist(createdat, createdby, updatedat, updatedby, weeklymatchprogramid, matchid, matchno, isinlist) values (?, ?, ?, ?, ?, ?, ?, ?)" ,
  "addMatchToList" : "insert into weeklymatchlist(createdat, createdby, updatedat, updatedby, weeklymatchprogramid, matchid, matchno, isinlist) values (?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateWeeklyMatchList" : "update weeklymatchlist set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, weeklymatchprogramid = ?, matchid = ?, matchno = ?, isinlist = ? where id = ? and weeklymatchprogramid = ?" ,
  "clearWeeklyMatchList" : "delete from weeklymatchlist where weeklymatchprogramid = ?" ,
  "deleteMatchFromList" :  "delete from weeklymatchlist where id = ?"

}
