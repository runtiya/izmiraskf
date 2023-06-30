const express = require('express');
const multer = require('multer');

const pointBoardController = require('../../controllers/application/pointboard');

const extractImage = require('../../middlewares/extract-image');

const router = express.Router();

router.get("/:groupstageid/:matchweek", pointBoardController.getPointBoard);


module.exports = router;
