const express = require("express");
const SerieController = require("./serieController");

const router = express.Router();

router.post("/", SerieController.createSerie);
router.get("/", SerieController.getSeries);
router.get("/:id", SerieController.getSerieById);
router.put("/:id", SerieController.updateSerie);
router.delete("/:id", SerieController.deleteSerie);
router.get("/user/:userId", SerieController.getSeriesByUserId);
router.post("/recommend/:userId", SerieController.generateSeriesByAI);

module.exports = router;
