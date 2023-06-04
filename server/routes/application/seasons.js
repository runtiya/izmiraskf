const express = require('express');
const multer = require('multer');

const seasonsController = require('../../controllers/application/seasons');

const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", seasonsController.getSeasons);


module.exports = router;
