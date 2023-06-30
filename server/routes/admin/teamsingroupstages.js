const express = require('express');
const multer = require('multer');

const teamsingroupstagesController = require('../../controllers/admin/teamsingroupstages');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("/:groupstageId", checkAuth, teamsingroupstagesController.getTeamsInGroupstages);

router.get("", checkAuth, teamsingroupstagesController.getTeamsForGroupstages);

router.post("/:groupstageId", checkAuth, teamsingroupstagesController.createTeamsInGroupstages);

router.put("", checkAuth, teamsingroupstagesController.updateTeamsForGroupstages)

router.delete("/:groupstageId", checkAuth, teamsingroupstagesController.deleteTeamsInGroupstages);


module.exports = router;
