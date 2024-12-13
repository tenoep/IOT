const dumbbellService = require("./dumbbellService");
const logger = require("../logger");
const log = new logger.Logger("DumbbellController");

// Get all dumbbells controller
const getAllDumbbells = async (req, res) => {
  log.info("Entering getAllDumbbells");
  try {
    const data = await dumbbellService.getAllDumbbells();
    return res.status(200).json(data);
  } catch (error) {
    log.error(`Error in getAllDumbbells: ${error.message}`);
    return res.status(500).json({ error: "Failed to fetch dumbbells" });
  }
};

// Create dumbbell controller
const createDumbbell = async (req, res) => {
  log.info("Entering createDumbbell");
  try {
    const data = await dumbbellService.createDumbbell(req.body);
    return res.status(201).json(data);
  } catch (error) {
    log.error(`Error in createDumbbell: ${error.message}`);
    return res.status(500).json({ error: "Failed to create dumbbell" });
  }
};

// Update dumbbell controller
const updateDumbbell = async (req, res) => {
  log.info("Entering updateDumbbell");
  try {
    const data = await dumbbellService.updateDumbbell(req.params.id, req.body);
    return res.status(200).json(data);
  } catch (error) {
    log.error(`Error in updateDumbbell: ${error.message}`);
    return res.status(500).json({ error: "Failed to update dumbbell" });
  }
};

// Delete dumbbell controller
const deleteDumbbell = async (req, res) => {
  log.info("Entering deleteDumbbell");
  try {
    const data = await dumbbellService.deleteDumbbell(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    log.error(`Error in deleteDumbbell: ${error.message}`);
    return res.status(500).json({ error: "Failed to delete dumbbell" });
  }
};

module.exports = {
  getAllDumbbells,
  createDumbbell,
  updateDumbbell,
  deleteDumbbell,
};
