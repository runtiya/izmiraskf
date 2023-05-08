const express = require('express');
const multer = require('multer');

const groupsController = require('../../controllers/admin/groupstages');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("/hafta-siralamasi/:id", groupsController.getWeekSequence);

router.get("/son-musabaka-haftasi/:id", groupsController.getPlayedLastMatchWeek);

router.get("/:leagueid", groupsController.getGroupStages);

router.post("", groupsController.createGroupStage);

router.put("/:id", groupsController.updateGroupStage);

router.delete("/:id", groupsController.deleteGroupStage)


module.exports = router;
