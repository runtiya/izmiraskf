const express = require('express');
const multer = require('multer');

const leaguesController = require('../../controllers/admin/leagues');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("/:seasonid", leaguesController.getLeagues);

router.post("", leaguesController.createLeague);

router.put("/:id", leaguesController.updateLeague);

router.delete("/:id", leaguesController.deleteLeague)


module.exports = router;
