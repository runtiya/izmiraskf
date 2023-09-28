module.exports = {
  "getWeeklyMatchList" : "select * from VIEW_APPLICATION_WEEKLYMATCHLIST where weeklymatchprogramid in (select id from VIEW_APPLICATION_WEEKLYMATCHPROGRAM)"
}
