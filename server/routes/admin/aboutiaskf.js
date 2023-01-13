const express = require('express');
const multer = require('multer');

const aboutiaskfController = require('../../controllers/admin/aboutiaskf');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("", aboutiaskfController.getAboutContent);

router.put("", aboutiaskfController.updateAboutContent);

module.exports = router;
