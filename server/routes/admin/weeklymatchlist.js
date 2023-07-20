const express = require('express');

const weeklymatchlistController = require('../../controllers/admin/weeklymatchlist');

const checkAuth = require('../../middlewares/check-auth');

const router = express.Router();


router.get("/:weeklymatchprogramid", checkAuth, weeklymatchlistController.getWeeklyMatchList);

router.post("/create", checkAuth, weeklymatchlistController.createWeeklyMatchList);

router.post("/add", checkAuth, weeklymatchlistController.addMatchToList);

router.put("/:id", checkAuth, weeklymatchlistController.updateWeeklyMatchList);

router.delete("/clear/:id", checkAuth, weeklymatchlistController.clearWeeklyMatchList);

router.delete("/delete/:id", checkAuth, weeklymatchlistController.deleteMatchFromList);


module.exports = router;
