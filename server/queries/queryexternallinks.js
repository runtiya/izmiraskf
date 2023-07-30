module.exports = {
  "getExternalLinks" : "select * from view_admin_externallinks",
  "createExternalLink" : "insert into externallinks(createdat, createdby, updatedat, updatedby, linkname, url, linktype, imagepath, fabrand, orderno, isactive)values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  "updateExternalLink" : "update externallinks set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, linkname = ?, url = ?, linktype = ?, imagepath = ?, fabrand = ?, orderno = ?, isactive = ? where id = ?",
  "deleteExternalLink" : "delete from externallinks where id = ?"
}
