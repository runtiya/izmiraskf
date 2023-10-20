const express = require('express');

const seasonsController = require('../../controllers/admin/seasons');

const checkAuth = require('../../middlewares/check-auth');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();

router.get("", checkAuth, seasonsController.getSeasons);

router.post("", checkAuth, setTimestamp, seasonsController.createSeason);

router.put("/:id", checkAuth, setTimestamp, seasonsController.updateSeason);

router.delete("/:id", checkAuth, seasonsController.deleteSeason)


module.exports = router;
