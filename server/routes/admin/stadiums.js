const express = require('express');
const multer = require('multer');

const stadiumsController = require('../../controllers/admin/stadiums');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();





router.get("", stadiumsController.getStadiums);

router.get("/:id", stadiumsController.findStadium);

router.post("", stadiumsController.createStadium);

router.put("/:id", stadiumsController.updateStadium);

router.delete("/:id", stadiumsController.deleteStadium);


module.exports = router;
