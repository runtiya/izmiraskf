const express = require('express');

const aboutizmiraskfController = require('../../controllers/application/aboutizmiraskf');

const router = express.Router();


router.get("", aboutizmiraskfController.getAboutContent);

router.get("/getlogo", aboutizmiraskfController.getLogoPath);

module.exports = router;
