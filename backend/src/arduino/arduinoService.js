const Serie = require("../models/serieModel"); // Adjust the path as needed
const logger = require("../logger");
const log = new logger.Logger("ArduinoService");

const registerDumbell = async (reqData) => {
  log.info("Entering registerDumbell");
  try {
    // Destructure and validate request data
    const { userId, dumbbellId } = reqData;
    if (!userId || !dumbbellId) {
      throw new Error("Missing userId or dumbbellId in request data");
    }

    // Find series for the user without a dumbbell ID
    const seriesToUpdate = await Serie.find({ userId, dumbbellId: { $exists: false } });

    if (seriesToUpdate.length === 0) {
      log.info("No series found to update");
      return { message: "No series found to update", updatedCount: 0 };
    }

    // Update all matching series with the provided dumbbell ID
    const updateResult = await Serie.updateMany(
      { userId, dumbbellId: { $exists: false } },
      { $set: { dumbbellId } }
    );

    log.info(`${updateResult.modifiedCount} series updated with dumbbellId: ${dumbbellId}`);
    return { message: "Series updated successfully", updatedCount: updateResult.modifiedCount };
  } catch (error) {
    log.error(`Error in registerDumbell: ${error.message}`);
    throw new Error("Failed to register dumbbell");
  }
};

const handleArduinoData = async (reqData) => {
  log.info("Entering handleArduinoData");

  try {
    // Destructure and validate input data
    const { dumbbellId, repetitionsDone, timeDone, weightDone, dateDone } = reqData;

    if (!dumbbellId || !repetitionsDone || !timeDone || !weightDone || !dateDone) {
      throw new Error("Missing required parameters in request data");
    }

    // Find the oldest unfinished series for the same dumbbell ID
    const existingSerie = await Serie.findOne({
      dumbbellId,
      dateDone: { $exists: false }, // Series not yet completed
    }).sort({ dateCreation: 1 }); // Sort by creation date (oldest first)

    if (existingSerie) {
      // Update the existing series with the measured values
      existingSerie.repetitionsDone = repetitionsDone;
      existingSerie.timeDone = timeDone;
      existingSerie.weightDone = weightDone;
      existingSerie.dateDone = dateDone;
      await existingSerie.save();

      log.info(`Updated existing series: ${existingSerie._id}`);
      return { message: "Updated existing series", serie: existingSerie };
    } else {
      // If no existing series, create a new one
      const newSerie = new Serie({
        dumbbellId,
        repetitionsDone,
        timeDone,
        weightDone,
        dateDone,
      });
      await newSerie.save();

      log.info(`Created new series: ${newSerie._id}`);
      return { message: "Created new series", serie: newSerie };
    }
  } catch (error) {
    log.error(`Error in handleArduinoData: ${error.message}`);
    throw new Error("Failed to process Arduino data");
  }
};

module.exports = {
  registerDumbell,
  handleArduinoData,
};
