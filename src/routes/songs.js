const express = require("express");
const router = express.Router();
const songController = require("../controllers/songController");
const base = "http://localhost:3000/users"

router.get("/songs", songController.index);
router.get("/users/:id/songs/new/", songController.new);
router.post("/users/:id/songs/create", songController.create);
router.get("/users/:userId/users/6/songs/:songId", songController.show);

module.exports = router;