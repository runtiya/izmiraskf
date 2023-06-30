const express = require('express');
const multer = require('multer');

const pointBoardController = require('../../controllers/admin/pointboard');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');

const router = express.Router();

router.get("/:groupstageid/:matchweek", pointBoardController.getPointBoard);


module.exports = router;
