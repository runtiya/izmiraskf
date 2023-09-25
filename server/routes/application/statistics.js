const express = require('express');

const statisticsController = require('../../controllers/application/statistics');

const router = express.Router();


router.get("/teams-count-by-town", statisticsController.getTeamsCountByTown);

router.get("/stadiums-count-by-town", statisticsController.getStadiumsCountByTown);

router.get("/stadiums-count-by-floortype", statisticsController.getStadiumsCountByFloorType);

router.get("/matchstatus-count-by-league", statisticsController.getMatchStatusCountByLeague);

router.get("/season-summary-list", statisticsController.getSeasonSummaryList);


module.exports = router;
