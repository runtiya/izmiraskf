const express = require('express');

const disciplinaryBoardFileController = require('../../controllers/application/disciplinaryboardfiles');

const router = express.Router();

router.get("/:seasonid/:casetype", disciplinaryBoardFileController.getDisciplinaryBoardFiles);

module.exports = router;
