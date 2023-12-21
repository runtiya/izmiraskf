const express = require('express');

const aboutizmiraskfController = require('../../controllers/application/aboutizmiraskf');

const router = express.Router();

const cache = require('../../middlewares/request-cache');

router.get("", aboutizmiraskfController.getAboutContent);

router.get("/getlogo", cache(10000),aboutizmiraskfController.getLogoPath);

module.exports = router;
