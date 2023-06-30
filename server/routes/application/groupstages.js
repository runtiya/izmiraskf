const express = require('express');
const multer = require('multer');

const groupsController = require('../../controllers/application/groupstages');

const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("/hafta-siralamasi/:id", groupsController.getWeekSequence);

router.get("/son-musabaka-haftasi/:id", groupsController.getPlayedLastMatchWeek);

router.get("/:leagueid", groupsController.getGroupStages);



module.exports = router;
