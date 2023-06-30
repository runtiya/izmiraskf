const express = require('express');
const multer = require('multer');

const disciplinaryBoardDecisionController = require('../../controllers/application/disciplinaryboarddecisions');

const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("/:fileid", disciplinaryBoardDecisionController.getDisciplinaryBoardDecisions);


module.exports = router;
