const express = require('express');
const multer = require('multer');

const aboutizmiraskfController = require('../../controllers/admin/aboutizmiraskf');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("", checkAuth, aboutizmiraskfController.getAboutContent);

router.put("", checkAuth, extractImage, aboutizmiraskfController.updateAboutContent);

module.exports = router;
