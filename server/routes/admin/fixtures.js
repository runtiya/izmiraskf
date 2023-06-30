const express = require('express');
const multer = require('multer');

const fixturesController = require('../../controllers/admin/fixtures');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.put("/arama", checkAuth, fixturesController.getFixtureBySearchIndex);

router.post("/olustur", checkAuth, fixturesController.createFixture);

router.put("/guncelle", checkAuth, fixturesController.updateFixture);

router.delete("/sil/:id", checkAuth, fixturesController.deleteMatch);

router.delete("/temizle/:groupstageid", checkAuth, fixturesController.clearFixture)

module.exports = router;
