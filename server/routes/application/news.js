const express = require('express');
const multer = require('multer');

const newsController = require('../../controllers/application/news');

const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", newsController.getNews);

router.get("/:id", newsController.getNewsById);


module.exports = router;
