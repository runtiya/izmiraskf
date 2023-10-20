const express = require('express');

const disciplinaryBoardDecisionController = require('../../controllers/admin/disciplinaryboarddecisions');

const checkAuth = require('../../middlewares/check-auth');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();


router.get("/:fileid", checkAuth, disciplinaryBoardDecisionController.getDisciplinaryBoardDecisions);

router.post("", checkAuth, setTimestamp, disciplinaryBoardDecisionController.createDisciplinaryBoardDecision);

router.put("/:id", checkAuth, setTimestamp, disciplinaryBoardDecisionController.updateDisciplinaryBoardDecision);

router.delete("/:id", checkAuth, disciplinaryBoardDecisionController.deleteDisciplinaryBoardDecision);

router.delete("/temizle/:fileid", checkAuth, disciplinaryBoardDecisionController.clearDisciplinaryBoardDecisions);


module.exports = router;
