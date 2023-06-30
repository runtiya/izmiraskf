const express = require('express');
const multer = require('multer');

const aboutizmiraskfController = require('../../controllers/application/aboutizmiraskf');

const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("", aboutizmiraskfController.getAboutContent);

router.get("/getlogo", aboutizmiraskfController.getLogoPath);

module.exports = router;
