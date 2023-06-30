const express = require('express');
const multer = require('multer');

const disciplinaryBoardFileController = require('../../controllers/application/disciplinaryboardfiles');

const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.get("/:seasonid", disciplinaryBoardFileController.getDisciplinaryBoardFiles);

module.exports = router;
