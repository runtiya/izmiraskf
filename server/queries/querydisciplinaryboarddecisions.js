module.exports = {
  "getDisciplinaryBoardDecisions" : "select * from view_admin_disciplinaryboarddecisions where disciplinaryBoardFileId = ?",
  "createDisciplinaryBoardDecision" : "insert into disciplinaryboarddecisions(createdat, createdby, updatedat, updatedby, fileid, leagueid, teamid, fullname, licenseno, belongingto, penaltype, duration, explanation) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  "updateDisciplinaryBoardDecision" : "update disciplinaryboarddecisions set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, fileid = ?, leagueid = ?, teamid = ?, fullname = ?, licenseno = ?, belongingto = ?, penaltype = ?, duration = ?, explanation = ? where id = ?",
  "deleteDisciplinaryBoardDecision" : "delete from disciplinaryboarddecisions where id = ?",
  "clearDisciplinaryBoardDecisions" : "delete from disciplinaryboarddecisions where fileid = ?"
}
