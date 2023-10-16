const express = require('express');
const multer = require('multer');

const newsController = require('../../controllers/admin/news');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();


router.get("", checkAuth, newsController.getNews);

router.get("/:id", checkAuth, newsController.findNews);

router.post("", checkAuth, extractImage, setTimestamp, newsController.createNews);

router.put("/:id", checkAuth, extractImage, setTimestamp, newsController.updateNews);

router.delete("/:id", checkAuth, newsController.deleteNews);


module.exports = router;
