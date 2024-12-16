const {
  registerDumbell,
  handleArduinoData,
} = require("./arduinoController");
const router = require("express").Router();

router.post("/register/dumbell", registerDumbell);
router.post("/rep", handleArduinoData)

module.exports = router;
