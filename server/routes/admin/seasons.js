const express = require('express');
const multer = require('multer');

const seasonsController = require('../../controllers/admin/seasons');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const setTimestamp = require('../../middlewares/setTimestamp');

router = express.Router();

router.get("", checkAuth, seasonsController.getSeasons);

router.post("", checkAuth, setTimestamp, seasonsController.createSeason);

router.put("/:id", checkAuth, setTimestamp, seasonsController.updateSeason);

router.delete("/:id", checkAuth, seasonsController.deleteSeason)


module.exports = router;
