module.exports = {
  "getDisciplinaryBoardFiles" : "select * from VIEW_ADMIN_DISCIPLINARYBOARDFILES where seasonid = ? and casetype = ?",
  "createDisciplinaryBoardFile" : "insert into DISCIPLINARYBOARDFILES(createdat, createdby, updatedat, updatedby, seasonid, caseno, casedate, casetype, title, participants, explanation) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  "updateDisciplinaryBoardFile" : "update DISCIPLINARYBOARDFILES set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, seasonid = ?, caseno = ?, casedate = ?, casetype = ?, title = ?, participants = ?, explanation = ? where id = ?",
  "deleteDisciplinaryBoardFile" : "delete from DISCIPLINARYBOARDFILES where id = ?"
}
