const express = require('express');

const teamsingroupstagesController = require('../../controllers/admin/teamsingroupstages');

const checkAuth = require('../../middlewares/check-auth');

const router = express.Router();


router.get("/:groupstageId", checkAuth, teamsingroupstagesController.getTeamsInGroupstages);

router.get("", checkAuth, teamsingroupstagesController.getTeamsForGroupstages);

router.post("/:groupstageId", checkAuth, teamsingroupstagesController.createTeamsInGroupstages);

router.put("", checkAuth, teamsingroupstagesController.updateTeamsForGroupstages)


module.exports = router;
