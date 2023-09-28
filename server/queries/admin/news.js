module.exports = {
  "getNews" : "select * from VIEW_ADMIN_NEWS" ,
  "getNewsWithPagination" : "select * from VIEW_ADMIN_NEWS limit ? offset ?",
  "getNewsCount" : "select count(1) as 'count' from VIEW_ADMIN_NEWS",
  "findNews" : "" ,
  "createNews" : "insert into NEWS(createdat, createdby, updatedat, updatedby, title, content, imagepath, isvisible)values (?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateNews" : "update NEWS set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, title = ?, content = ?, imagepath = ?, isvisible = ? where id = ?" ,
  "deleteNews" :  "delete from NEWS where id = ?"
}
