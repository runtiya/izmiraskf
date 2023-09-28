module.exports = {
  "getNews" : "select * from VIEW_APPLICATION_NEWS limit ? offset ?" ,
  "getNewsById" : "select * from VIEW_APPLICATION_NEWS where id = ?" ,
  "getNewsForSlider" : "select * from VIEW_APPLICATION_NEWSFORSLIDER",
  "getNewsCount": "select count(1) as 'count' from VIEW_APPLICATION_NEWS"
}
