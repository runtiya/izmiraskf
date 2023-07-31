module.exports = {
  "getDisciplinaryBoardFiles" : "select * from view_admin_disciplinaryboardfiles where seasonid = ? and casetype = ?",
  "createDisciplinaryBoardFile" : "insert into disciplinaryboardfiles(createdat, createdby, updatedat, updatedby, seasonid, caseno, casedate, casetype, title, participants, explanation) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  "updateDisciplinaryBoardFile" : "update disciplinaryboardfiles set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, seasonid = ?, caseno = ?, casedate = ?, casetype = ?, title = ?, participants = ?, explanation = ? where id = ?",
  "deleteDisciplinaryBoardFile" : "delete from disciplinaryboardfiles where id = ?"
}
