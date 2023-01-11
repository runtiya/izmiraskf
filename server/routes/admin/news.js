const express = require('express');
const multer = require('multer');

const newsController = require('../../controllers/admin/news');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();





router.get("", newsController.getNews);

router.get("/:id", newsController.findNews);

router.post("", newsController.createNews);

router.put("/:id", newsController.updateNews);

router.delete("/:id", newsController.deleteNews);


module.exports = router;
