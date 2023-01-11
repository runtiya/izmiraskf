const express = require('express');
const multer = require('multer');

const seasonsController = require('../../controllers/admin/seasons');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("", seasonsController.getSeasons);

router.post("", seasonsController.createSeason);

router.put("/:id", seasonsController.updateSeason);

router.delete("/:id", seasonsController.deleteSeason)


module.exports = router;
