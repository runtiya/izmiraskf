const express = require('express');
const multer = require('multer');

const externalLinksController = require('../../controllers/admin/externallinks');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("", checkAuth, externalLinksController.getExternalLinks);

router.post("", checkAuth, externalLinksController.createExternalLink);

router.put("/:id", checkAuth, externalLinksController.updateExternalLink);

router.delete("/:id", checkAuth, externalLinksController.deleteExternalLink)


module.exports = router;
