// Get all news list
function getNews(req, res, next) {
  const news = [
    { id: '1',
      title: 'Title #1',
      content: 'Content #1',
      img: 'image #1',
      createdAt: '22.12.2022',
      createdBy: 'Jane Doe',
      isOnline: true
    },
    { id: '2',
      title: 'Title #2',
      content: 'Content #2',
      img: 'image #2',
      createdAt: '21.12.2022',
      createdBy: 'John Doe',
      isOnline: false
    }
  ];

  res.status(200).json({
    error: false,
    message: 'News fetched successfully!',
    news: news
  });
}


// Get a news by id
function findNews(req, res, next) {

}

// Create a new news
function createNews(req, res, next) {
  const news = req.body;
  console.log(typeof(news.image));
  console.log(!!news.image);
  res.status(200).json({
    error: false,
    message: 'News added successfully!',
    newsId: null
  });
}

// Update a news by id
function updateNews(req, res, next) {
  const news = req.body;
  console.log(typeof(news.image));
  console.log(!!news.image);
  res.status(200).json({
    error: false,
    message: 'News updated successfully!'
  });
}

// Delete a news by id
function deleteNews(req, res, next) {
  const newsId = req.params.id;

  console.log(newsId);
  res.status(200).json({
    error: false,
    message: 'News deleted successfully!'
  });
}


exports.getNews = getNews;
exports.findNews = findNews;
exports.createNews = createNews;
exports.updateNews = updateNews;
exports.deleteNews = deleteNews;
