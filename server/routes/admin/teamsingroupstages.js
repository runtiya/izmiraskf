const express = require('express');
const multer = require('multer');

const teamsingroupstagesController = require('../../controllers/admin/teamsingroupstages');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("/:groupstageId", teamsingroupstagesController.getTeamsInGroupstages);

router.get("", teamsingroupstagesController.getTeamsForGroupstages);

router.post("/:groupstageId", teamsingroupstagesController.createTeamsInGroupstages);

router.put("", teamsingroupstagesController.updateTeamsForGroupstages)

router.delete("/:groupstageId", teamsingroupstagesController.deleteTeamsInGroupstages);


module.exports = router;
