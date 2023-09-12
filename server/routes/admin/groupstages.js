const express = require('express');
const multer = require('multer');

const groupsController = require('../../controllers/admin/groupstages');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();


router.get("/hafta-siralamasi/:id", checkAuth, groupsController.getWeekSequence);

router.get("/son-musabaka-haftasi/:id", checkAuth, groupsController.getPlayedLastMatchWeek);

router.get("/:leagueid", checkAuth, groupsController.getGroupStages);

router.post("", checkAuth, setTimestamp, groupsController.createGroupStage);

router.put("/:id", checkAuth, setTimestamp, groupsController.updateGroupStage);

router.delete("/:id", checkAuth, groupsController.deleteGroupStage)


module.exports = router;
