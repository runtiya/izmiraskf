const express = require('express');
const multer = require('multer');

const fixturesController = require('../../controllers/admin/fixtures');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("/:groupstageid", fixturesController.getFixture);

router.put("/arama", fixturesController.getFixtureBySearchIndex);

router.post("/olustur", fixturesController.createFixture);

router.put("/guncelle", fixturesController.updateFixture);

router.delete("/sil/:id", fixturesController.deleteMatch);

router.delete("/temizle/:groupstageid", fixturesController.clearFixture)

module.exports = router;
