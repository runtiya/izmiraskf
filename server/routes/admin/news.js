const express = require('express');
const multer = require('multer');

const newsController = require('../../controllers/admin/news');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();





router.get("", checkAuth, newsController.getNews);

router.get("/:id", checkAuth, newsController.findNews);

router.post("", checkAuth, newsController.createNews);

router.put("/:id", checkAuth, newsController.updateNews);

router.delete("/:id", checkAuth, newsController.deleteNews);


module.exports = router;
