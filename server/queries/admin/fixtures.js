module.exports = {
  "getFixtureBySearchIndex" : "",
  "createFixture" : "insert into FIXTURES(createdat, createdby, updatedat, updatedby, groupstageid, matchno, matchweek, matchdate, matchstatus, stadiumid, hometeamid, hometeamscore, ishometeamwinbyforfeit, hometeampoint, awayteamid, awayteamscore, isawayteamwinbyforfeit, awayteampoint, explanation, orderno) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  "updateFixture" : "update FIXTURES set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, groupstageid = ?, matchno = ?, matchweek = ?, matchdate = ?, matchstatus = ?, stadiumid = ?, hometeamid = ?, hometeamscore = ?, ishometeamwinbyforfeit = ?, hometeampoint = ?, awayteamid = ?, awayteamscore = ?, isawayteamwinbyforfeit = ?, awayteampoint = ?, explanation = ?, orderno = ? where id = ?" ,
  "deleteMatch" : "delete from FIXTURES where id = ?" ,
  "clearFixture" : "delete from FIXTURES where groupstageid = ?"
}
