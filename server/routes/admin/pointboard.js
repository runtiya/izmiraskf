const express = require('express');

const pointBoardController = require('../../controllers/admin/pointboard');

const router = express.Router();

router.get("/:groupstageid/:matchweek", pointBoardController.getPointBoard);


module.exports = router;
