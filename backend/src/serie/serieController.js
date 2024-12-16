const SerieService = require("./serieService");
const logger = require("../logger");
const log = new logger.Logger("SerieController");

class SerieController {
  async createSerie(req, res) {
    try {
      const serie = await SerieService.createSerie(req.body);
      log.info("Serie created successfully", { id: serie._id });
      res.status(201).send(serie);
    } catch (error) {
      log.error("Error creating Serie", { error });
      res.status(500).send("Failed to create Serie");
    }
  }

  async getSeries(req, res, next) {
    try {
      const series = await SerieService.getSeries();
      res.json(series);
    } catch (error) {
      log.error("Failed to retrieve series", { error });
      next(error);
    }
  }

  async getSerieById(req, res, next) {
    try {
      const serie = await SerieService.getSerieById(req.params.id);
      if (!serie) return res.status(404).json({ error: "Serie not found" });
      res.json(serie);
    } catch (error) {
      log.error("Failed to retrieve serie by ID", { error });
      next(error);
    }
  }

  async updateSerie(req, res, next) {
    try {
      const serie = await SerieService.updateSerie(req.params.id, req.body);
      if (!serie) return res.status(404).json({ error: "Serie not found" });
      res.json(serie);
    } catch (error) {
      log.error("Failed to update serie", { error });
      next(error);
    }
  }

  async deleteSerie(req, res, next) {
    try {
      const serie = await SerieService.deleteSerie(req.params.id);
      if (!serie) return res.status(404).json({ error: "Serie not found" });
      res.json({ message: "Serie deleted successfully" });
    } catch (error) {
      log.error("Failed to delete serie", { error });
      next(error);
    }
  }

  async getSeriesByUserId(req, res, next) {
    try {
      const userId = req.params.userId;
      const series = await SerieService.getSeriesByUserId(userId);
      res.json(series);
    } catch (error) {
      log.error("Failed to retrieve series by user ID", { error });
      next(error);
    }
  }

  async generateSeriesByAI(req, res, next) {
    try {
      const userId = req.params.userId;
      const createdSeries = await SerieService.generateSeriesByAI(userId);
      res.status(201).json(createdSeries);
    } catch (error) {
      log.error("Failed to generate series by AI", { error });
      next(error);
    }
  }
}

module.exports = new SerieController();
