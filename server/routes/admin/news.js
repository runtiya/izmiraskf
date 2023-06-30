const express = require('express');
const multer = require('multer');

const newsController = require('../../controllers/admin/news');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');

const router = express.Router();





router.get("", checkAuth, newsController.getNews);

router.get("/:id", checkAuth, newsController.findNews);

router.post("", checkAuth, extractImage, newsController.createNews);

router.put("/:id", checkAuth, extractImage, newsController.updateNews);

router.delete("/:id", checkAuth, newsController.deleteNews);


module.exports = router;
