const Serie = require("../models/serieModel");
const logger = require("../logger");
const log = new logger.Logger("SerieService");

class SerieService {
  async createSerie(data) {
    try {
      const serie = new Serie(data);
      const savedSerie = await serie.save();
      log.info("Serie created successfully", { id: savedSerie._id });
      return savedSerie;
    } catch (error) {
      log.error("Error creating Serie", { error });
      throw new Error("Failed to create Serie");
    }
  }

  async getSeries() {
    log.info("Entering getSeries");
    try {
      const series = await Serie.find().populate("userId");
      log.info("Get Series success");
      return series;
    } catch (error) {
      log.error("Get Series error", error);
      throw new Error("Unable to retrieve serie", error);
    }
  }

  async getSerieById(id) {
    try {
      const serie = await Serie.findById(id).populate("userId");
      if (!serie) {
        log.warn(`Serie with ID ${id} not found`);
        throw new Error("Serie not found");
      }
      log.info("Serie retrieved successfully", { id });
      return serie;
    } catch (error) {
      log.error("Error retrieving Serie by ID", { id, error });
      throw new Error("Failed to retrieve Serie");
    }
  }

  async updateSerie(id, data) {
    try {
      const updatedSerie = await Serie.findByIdAndUpdate(id, data, {
        new: true,
      }).populate("userId");
      if (!updatedSerie) {
        log.warn(`Serie with ID ${id} not found for update`);
        throw new Error("Serie not found");
      }
      log.info("Serie updated successfully", { id });
      return updatedSerie;
    } catch (error) {
      log.error("Error updating Serie", { id, error });
      throw new Error("Failed to update Serie");
    }
  }

  async deleteSerie(id) {
    try {
      const deletedSerie = await Serie.findByIdAndDelete(id);
      if (!deletedSerie) {
        log.warn(`Serie with ID ${id} not found for deletion`);
        throw new Error("Serie not found");
      }
      log.info("Serie deleted successfully", { id });
      return deletedSerie;
    } catch (error) {
      log.error("Error deleting Serie", { id, error });
      throw new Error("Failed to delete Serie");
    }
  }
}

module.exports = new SerieService();
