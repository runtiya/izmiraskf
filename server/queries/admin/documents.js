module.exports = {
  "getDocuments" : "select * from view_admin_documents where category = ?",
  "createDocument" : "insert into documents(createdat, createdby, updatedat, updatedby, documentname, filename, filemimetype, filesize, filepath, category, orderno) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  "updateDocument" : "update documents set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, documentname = ?, filename = ?, filemimetype = ?, filesize = ?, filepath = ?, category = ?, orderno = ? where id = ?",
  "deleteDocument" : "delete from documents where id = ?"
}
