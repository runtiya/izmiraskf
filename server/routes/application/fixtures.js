const express = require('express');
const multer = require('multer');

const fixturesController = require('../../controllers/application/fixtures');

const extractImage = require('../../middlewares/extract-image');

const router = express.Router();


router.put("/arama", fixturesController.getFixtureBySearchIndex);


module.exports = router;
