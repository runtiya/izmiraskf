const express = require('express');
const multer = require('multer');

const seasonsController = require('../../controllers/application/seasons');

const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("", seasonsController.getSeasons);


module.exports = router;
