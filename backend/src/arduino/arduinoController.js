const dumbbellService = require("./arduinoService");
const logger = require("../logger");
const log = new logger.Logger("ArduinoController");

// Get all dumbbells controller
const registerDumbell = async (req, res) => {
  log.info("Entering registerDumbell");
  try {
    const data = await dumbbellService.registerDumbell(req.body);
    return res.status(200).json(data);
  } catch (error) {
    log.error(`Error in register dumbell: ${error.message}`);
    return res.status(500).json({ message: "Failed to register dumbell" });
  }
};


const handleArduinoData = async (req, res) => {
  log.info("Entering handleArduinoData");
  try {
    const data = await dumbbellService.handleArduinoData(req.body);
    return res.status(200).json(data);
  } catch (error) {
    log.error(`Error in arduino endpoint: ${error.message}`);
    return res.status(500).json({ message: "Failed to push rep" });
  }
};

module.exports = {
  registerDumbell,
  handleArduinoData,
};
