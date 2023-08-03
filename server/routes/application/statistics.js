const express = require('express');

const statisticsController = require('../../controllers/application/statistics');

const router = express.Router();


router.get("/teams-count-by-town", statisticsController.getTeamsCountByTown);

router.get("/stadiums-count-by-town", statisticsController.getStadiumsCountByTown);

router.get("/stadiums-count-by-floortype", statisticsController.getStadiumsCountByFloorType);


module.exports = router;
