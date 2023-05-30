const express = require('express');
const multer = require('multer');

const aboutizmiraskfController = require('../../controllers/application/aboutizmiraskf');

const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", aboutizmiraskfController.getAboutContent);

module.exports = router;
