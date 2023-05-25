const express = require('express');
const multer = require('multer');

const seasonsController = require('../../controllers/admin/seasons');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", checkAuth, seasonsController.getSeasons);

router.post("", checkAuth, seasonsController.createSeason);

router.put("/:id", checkAuth, seasonsController.updateSeason);

router.delete("/:id", checkAuth, seasonsController.deleteSeason)


module.exports = router;
