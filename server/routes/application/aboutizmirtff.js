const express = require('express');

const aboutizmirtffController = require('../../controllers/application/aboutizmirtff');

const router = express.Router();

router.get("", aboutizmirtffController.getAboutContent);

router.get("/getlogo", aboutizmirtffController.getLogoPath);

module.exports = router;
