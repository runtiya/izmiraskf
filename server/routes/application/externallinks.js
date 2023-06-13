const express = require('express');
const multer = require('multer');

const externalLinksController = require('../../controllers/application/externallinks');

const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("/:linktype", externalLinksController.getExternalLinks);



module.exports = router;
