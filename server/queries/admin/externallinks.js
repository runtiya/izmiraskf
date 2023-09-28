module.exports = {
  "getExternalLinks" : "select * from VIEW_ADMIN_EXTERNALLINKS",
  "createExternalLink" : "insert into EXTERNALLINKS(createdat, createdby, updatedat, updatedby, linkname, url, linktype, imagepath, fabrand, orderno, isactive)values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  "updateExternalLink" : "update EXTERNALLINKS set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, linkname = ?, url = ?, linktype = ?, imagepath = ?, fabrand = ?, orderno = ?, isactive = ? where id = ?",
  "deleteExternalLink" : "delete from EXTERNALLINKS where id = ?"
}
