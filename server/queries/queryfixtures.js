module.exports = {
  "getFixtureBySearchIndex" : "",
  "createFixture" : "insert into fixtures(createdat, createdby, updatedat, updatedby, groupstageid, matchno, matchweek, matchdate, matchstatus, stadiumid, hometeamid, hometeamscore, ishometeamwinbyforfeit, hometeampoint, awayteamid, awayteamscore, isawayteamwinbyforfeit, awayteampoint, explanation, orderno) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  "updateFixture" : "update fixtures set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, groupstageid = ?, matchno = ?, matchweek = ?, matchdate = ?, matchstatus = ?, stadiumid = ?, hometeamid = ?, hometeamscore = ?, ishometeamwinbyforfeit = ?, hometeampoint = ?, awayteamid = ?, awayteamscore = ?, isawayteamwinbyforfeit = ?, awayteampoint = ?, explanation = ?, orderno = ? where id = ?" ,
  "deleteMatch" : "delete from fixtures where id = ?" ,
  "clearFixture" : "delete from fixtures where groupstageid = ?"
}
