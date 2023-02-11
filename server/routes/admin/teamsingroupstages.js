const express = require('express');
const multer = require('multer');

const teamsingroupstagesController = require('../../controllers/admin/teamsingroupstages');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("/:groupstagesid", teamsingroupstagesController.getTeamsInGroupstages);

router.get("", teamsingroupstagesController.getTeamsForGroupstages);

router.post("/:groupstagesid", teamsingroupstagesController.createTeamsInGroupstages);

router.put("", teamsingroupstagesController.updateTeamsForGroupstages)

router.delete("/:groupstagesid", teamsingroupstagesController.deleteTeamsInGroupstages);


module.exports = router;
