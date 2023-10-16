const express = require('express');

const newsController = require('../../controllers/application/news');

const router = express.Router();


router.get("/list", newsController.getNews);

router.get("/news-id/:id", newsController.getNewsById);

router.get("/hot-topics", newsController.getNewsForSlider);


module.exports = router;
