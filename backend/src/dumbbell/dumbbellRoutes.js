const {
  getAllDumbbells,
  createDumbbell,
  updateDumbbell,
  deleteDumbbell,
} = require("./dumbbellController");
const router = require("express").Router();

router.get("/", getAllDumbbells);
router.post("/", createDumbbell);
router.put("/:id", updateDumbbell);
router.delete("/:id", deleteDumbbell);

module.exports = router;
