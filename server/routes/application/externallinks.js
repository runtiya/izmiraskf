const express = require('express');
const multer = require('multer');

const externalLinksController = require('../../controllers/application/externallinks');

const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("/:linktype", externalLinksController.getExternalLinks);



module.exports = router;
