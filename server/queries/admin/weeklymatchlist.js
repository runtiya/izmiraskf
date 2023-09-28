module.exports = {
  "getWeeklyMatchList" : "select * from VIEW_ADMIN_WEEKLYMATCHLIST where weeklymatchprogramid = ?",
  "createWeeklyMatchList" : "insert into WEEKLYMATCHLIST(createdat, createdby, updatedat, updatedby, weeklymatchprogramid, matchid, matchno, isinlist) values (?, ?, ?, ?, ?, ?, ?, ?)" ,
  "addMatchToList" : "insert into WEEKLYMATCHLIST(createdat, createdby, updatedat, updatedby, weeklymatchprogramid, matchid, matchno, isinlist) values (?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateWeeklyMatchList" : "update WEEKLYMATCHLIST set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, weeklymatchprogramid = ?, matchid = ?, matchno = ?, isinlist = ? where id = ? and weeklymatchprogramid = ?" ,
  "clearWeeklyMatchList" : "delete from WEEKLYMATCHLIST where weeklymatchprogramid = ?" ,
  "deleteMatchFromList" :  "delete from WEEKLYMATCHLIST where id = ?"

}
