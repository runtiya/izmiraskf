const express = require('express');

const externalLinksController = require('../../controllers/application/externallinks');

const router = express.Router();


router.get("/:linktype", externalLinksController.getExternalLinks);



module.exports = router;
