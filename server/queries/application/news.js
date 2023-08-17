module.exports = {
  "getNews" : "select * from view_application_news limit ? offset ?" ,
  "getNewsById" : "select * from view_application_news where id = ?" ,
  "getNewsForSlider" : "select * from view_application_newsforslider"
}
