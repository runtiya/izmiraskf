module.exports = {
  "getNews" : "select * from view_admin_news" ,
  "getNewsWithPagination" : "select * from view_admin_news limit ? offset ?",
  "findNews" : "" ,
  "createNews" : "insert into news(createdat, createdby, updatedat, updatedby, title, content, imagepath, isvisible)values (?, ?, ?, ?, ?, ?, ?, ?)" ,
  "updateNews" : "update news set createdat = ?, createdby = ?, updatedat = ?, updatedby = ?, title = ?, content = ?, imagepath = ?, isvisible = ? where id = ?" ,
  "deleteNews" :  "delete from news where id = ?"
}
