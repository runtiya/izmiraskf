const express = require('express');
const multer = require('multer');

const documentsController = require('../../controllers/application/documents');

const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("/:type", documentsController.getDocuments);



module.exports = router;
