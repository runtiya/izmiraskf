const express = require('express');
const multer = require('multer');

const fixturesController = require('../../controllers/admin/fixtures');

const checkAuth = require('../../middlewares/check-auth');
const extractImage = require('../../middlewares/extract-image');
const setTimestamp = require('../../middlewares/setTimestamp');

const router = express.Router();


router.put("/arama", checkAuth, setTimestamp, fixturesController.getFixtureBySearchIndex);

router.post("/olustur", checkAuth, setTimestamp, fixturesController.createFixture);

router.put("/guncelle", checkAuth, setTimestamp, fixturesController.updateFixture);

router.delete("/sil/:id", checkAuth, fixturesController.deleteMatch);

router.delete("/temizle/:groupstageid", checkAuth, fixturesController.clearFixture)

module.exports = router;
