const express = require('express');

const disciplinaryBoardDecisionController = require('../../controllers/application/disciplinaryboarddecisions');

const router = express.Router();

router.get("/:fileid", disciplinaryBoardDecisionController.getDisciplinaryBoardDecisions);

module.exports = router;
