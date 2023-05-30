const express = require('express');
const multer = require('multer');

const aboutizmirtffController = require('../../controllers/application/aboutizmirtff');

const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", aboutizmirtffController.getAboutContent);

module.exports = router;
