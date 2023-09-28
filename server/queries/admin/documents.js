module.exports = {
  "getDocuments" : "select * from VIEW_ADMIN_DOCUMENTS where filecategory = ?",
  "createDocument" : "insert into DOCUMENTS(createdat, createdby, updatedat, updatedby, documentname, filename, filemimetype, filesize, filepath, filecategory, filetype, orderno) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  "updateDocument" : "update DOCUMENTS set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, documentname = ?, filename = ?, filemimetype = ?, filesize = ?, filepath = ?, filecategory = ?, filetype = ?, orderno = ? where id = ?",
  "deleteDocument" : "delete from DOCUMENTS where id = ?"
}
