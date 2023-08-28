module.exports = {
  "getDocuments" : "select * from view_admin_documents where filecategory = ?",
  "createDocument" : "insert into documents(createdat, createdby, updatedat, updatedby, documentname, filename, filemimetype, filesize, filepath, filecategory, filetype, orderno) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  "updateDocument" : "update documents set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, documentname = ?, filename = ?, filemimetype = ?, filesize = ?, filepath = ?, filecategory = ?, filetype = ?, orderno = ? where id = ?",
  "deleteDocument" : "delete from documents where id = ?"
}
