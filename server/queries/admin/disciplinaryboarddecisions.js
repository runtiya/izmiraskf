module.exports = {
  "getDisciplinaryBoardDecisions" : "select * from VIEW_ADMIN_DISCIPLINARYBOARDDECISIONS where disciplinaryBoardFileId = ?",
  "createDisciplinaryBoardDecision" : "insert into DISCIPLINARYBOARDDECISIONS(createdat, createdby, updatedat, updatedby, fileid, leagueid, teamid, fullname, licenseno, belongingto, penaltype, duration, explanation) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  "updateDisciplinaryBoardDecision" : "update DISCIPLINARYBOARDDECISIONS set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, fileid = ?, leagueid = ?, teamid = ?, fullname = ?, licenseno = ?, belongingto = ?, penaltype = ?, duration = ?, explanation = ? where id = ?",
  "deleteDisciplinaryBoardDecision" : "delete from DISCIPLINARYBOARDDECISIONS where id = ?",
  "clearDisciplinaryBoardDecisions" : "delete from DISCIPLINARYBOARDDECISIONS where fileid = ?"
}
