const express = require('express');
const multer = require('multer');

const disciplinaryBoardDecisionController = require('../../controllers/admin/disciplinaryboarddecisions');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("/:fileid", checkAuth, disciplinaryBoardDecisionController.getDisciplinaryBoardDecisions);

router.post("", checkAuth, disciplinaryBoardDecisionController.createDisciplinaryBoardDecision);

router.put("/:id", checkAuth, disciplinaryBoardDecisionController.updateDisciplinaryBoardDecision);

router.delete("/:id", checkAuth, disciplinaryBoardDecisionController.deleteDisciplinaryBoardDecision);

router.delete("/temizle/:fileid", checkAuth, disciplinaryBoardDecisionController.clearDisciplinaryBoardDecisions);


module.exports = router;
