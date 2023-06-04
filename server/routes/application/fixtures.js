const express = require('express');
const multer = require('multer');

const fixturesController = require('../../controllers/application/fixtures');

const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("/:groupstageid", fixturesController.getFixture);

router.put("/arama", fixturesController.getFixtureBySearchIndex);


module.exports = router;
