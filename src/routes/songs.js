const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");

router.get("/songs", songController.index);
router.get("/songs/new/", songController.new);
router.post("/songs/create/", songController.create);

module.exports = router;