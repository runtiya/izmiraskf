const express = require('express');

const seasonsController = require('../../controllers/application/seasons');

const router = express.Router();


router.get("", seasonsController.getSeasons);


module.exports = router;
