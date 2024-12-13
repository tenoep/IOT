const Dumbbell = require("../models/dumbbellModel");
const logger = require("../logger");
const log = new logger.Logger("DumbbellService");

// Get all dumbbells service
const getAllDumbbells = async () => {
  log.info("Entering getAllDumbbells");
  try {
    const data = await Dumbbell.find().populate("userId");
    const sortedData = data.sort((a, b) => {
      const order = { on: 1, charging: 2, broken: 3, off: 4 };
      return order[a.state] - order[b.state];
    });

    return sortedData;
  } catch (error) {
    log.error(`Error in getAllDumbbells: ${error.message}`);
    throw new Error("Failed to fetch dumbbells");
  }
};

// Create a new dumbbell
const createDumbbell = async (dumbbellData) => {
  log.info("Entering createDumbbell");
  try {
    const dumbbell = new Dumbbell(dumbbellData);
    await dumbbell.save();
    return dumbbell;
  } catch (error) {
    log.error(`Error in createDumbbell: ${error.message}`);
    throw new Error("Failed to create dumbbell");
  }
};

// Update a dumbbell
const updateDumbbell = async (id, dumbbellData) => {
  log.info("Entering updateDumbbell");
  try {
    const dumbbell = await Dumbbell.findByIdAndUpdate(id, dumbbellData, {
      new: true,
    });
    return dumbbell;
  } catch (error) {
    log.error(`Error in updateDumbbell: ${error.message}`);
    throw new Error("Failed to update dumbbell");
  }
};

// Delete a dumbbell
const deleteDumbbell = async (id) => {
  log.info("Entering deleteDumbbell");
  try {
    const dumbbell = await Dumbbell.findByIdAndDelete(id);
    return dumbbell;
  } catch (error) {
    log.error(`Error in deleteDumbbell: ${error.message}`);
    throw new Error("Failed to delete dumbbell");
  }
};

module.exports = {
  getAllDumbbells,
  createDumbbell,
  updateDumbbell,
  deleteDumbbell,
};
