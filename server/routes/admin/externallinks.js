const express = require('express');
const multer = require('multer');

const externalLinksController = require('../../controllers/admin/externallinks');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();


router.get("", checkAuth, externalLinksController.getExternalLinks);

router.post("", checkAuth, extractImage, setTimestamp, externalLinksController.createExternalLink);

router.put("/:id", checkAuth, extractImage, setTimestamp, externalLinksController.updateExternalLink);

router.delete("/:id", checkAuth, externalLinksController.deleteExternalLink)


module.exports = router;
