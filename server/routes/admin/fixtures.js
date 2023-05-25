const express = require('express');
const multer = require('multer');

const fixturesController = require('../../controllers/admin/fixtures');

const checkAuth = require('../../middlewares/check-auth');
const extractTeamLogo = require('../../middlewares/extract-team-logo');

const router = express.Router();


router.get("/:groupstageid", checkAuth, fixturesController.getFixture);

router.put("/arama", checkAuth, fixturesController.getFixtureBySearchIndex);

router.post("/olustur", checkAuth, fixturesController.createFixture);

router.put("/guncelle", checkAuth, fixturesController.updateFixture);

router.delete("/sil/:id", checkAuth, fixturesController.deleteMatch);

router.delete("/temizle/:groupstageid", checkAuth, fixturesController.clearFixture)

module.exports = router;
