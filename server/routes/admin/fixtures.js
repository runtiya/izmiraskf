const express = require('express');
const multer = require('multer');

const fixturesController = require('../../controllers/admin/fixtures');

const checkAuth = require('../../middlewares/check-auth');
const checkImageMimeType = require('../../middlewares/check-image-mimetype');

const router = express.Router();


router.get("/:groupstageId", fixturesController.getFixture);

router.post("/:groupstageId", fixturesController.createFixture);

//router.put("", fixturesController)

router.delete("/:groupstageId", fixturesController.clearFixture);


module.exports = router;
