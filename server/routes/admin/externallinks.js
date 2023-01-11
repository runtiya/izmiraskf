const express = require('express');
const multer = require('multer');

const externalLinksController = require('../../controllers/admin/externallinks');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("", externalLinksController.getExternalLinks);

router.post("", externalLinksController.createExternalLink);

router.put("/:id", externalLinksController.updateExternalLink);

router.delete("/:id", externalLinksController.deleteExternalLink)


module.exports = router;
