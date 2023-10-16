const express = require('express');
const multer = require('multer');

const stadiumsController = require('../../controllers/admin/stadiums');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();

router.get("", checkAuth, stadiumsController.getStadiums);

router.get("/:id", checkAuth, stadiumsController.findStadium);

router.post("", checkAuth, extractImage, setTimestamp, stadiumsController.createStadium);

router.put("/:id", checkAuth, extractImage, setTimestamp, stadiumsController.updateStadium);

router.delete("/:id", checkAuth, stadiumsController.deleteStadium);


module.exports = router;
