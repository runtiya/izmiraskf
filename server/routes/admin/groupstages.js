const express = require('express');
const multer = require('multer');

const groupsController = require('../../controllers/admin/groupstages');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("/hafta-siralamasi/:id", checkAuth, groupsController.getWeekSequence);

router.get("/son-musabaka-haftasi/:id", checkAuth, groupsController.getPlayedLastMatchWeek);

router.get("/:leagueid", checkAuth, groupsController.getGroupStages);

router.post("", checkAuth, groupsController.createGroupStage);

router.put("/:id", checkAuth, groupsController.updateGroupStage);

router.delete("/:id", checkAuth, groupsController.deleteGroupStage)


module.exports = router;
