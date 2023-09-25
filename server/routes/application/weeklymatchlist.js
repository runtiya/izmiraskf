const express = require('express');

const weeklymatchlistController = require('../../controllers/application/weeklymatchlist');

const router = express.Router();


router.get("", weeklymatchlistController.getWeeklyMatchList);

module.exports = router;
