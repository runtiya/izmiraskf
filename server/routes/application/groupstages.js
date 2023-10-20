const express = require('express');

const groupsController = require('../../controllers/application/groupstages');

const router = express.Router();


router.get("/hafta-siralamasi/:id", groupsController.getWeekSequence);

router.get("/son-musabaka-haftasi/:id", groupsController.getPlayedLastMatchWeek);

router.get("/:leagueid", groupsController.getGroupStages);



module.exports = router;
