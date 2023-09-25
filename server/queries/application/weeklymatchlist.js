module.exports = {
  //"getWeeklyMatchList" : "select * from view_application_weeklymatchlist where weeklymatchprogramid in (select id from view_application_weeklymatchprogram where seasonid = ?)"
  "getWeeklyMatchList" : "select * from view_application_weeklymatchlist where  weeklymatchprogramid in (select id from view_application_weeklymatchprogram)"
}
