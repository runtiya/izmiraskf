const express = require('express');

const groupsController = require('../../controllers/application/groupstages');

const router = express.Router();


router.get("/week-order/:id", groupsController.getWeekSequence);

router.get("/last-match-week/:id", groupsController.getPlayedLastMatchWeek);

router.get("/:leagueid", groupsController.getGroupStages);



module.exports = router;
