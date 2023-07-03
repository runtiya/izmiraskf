const express = require('express');

const statisticsController = require('../../controllers/application/statistics');


const router = express.Router();



router.get("/goal-by-league", statisticsController.getGoalByLeague);



module.exports = router;
