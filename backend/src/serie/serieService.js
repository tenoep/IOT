const Serie = require("../models/serieModel");
const logger = require("../logger");
const log = new logger.Logger("SerieService");
const { callGptApi } = require("../utils/gptApi.js");

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

  async getSeriesByUserId(userId) {
    try {
      const series = await Serie.find({ userId }).populate("userId");
      return series;
    } catch (error) {
      log.error("Error retrieving series by userId", { userId, error });
      throw new Error("Failed to retrieve series by userId");
    }
  }

  async generateSeriesByAI(userId) {
    try {
      // 1. Récupérer l'historique des séries
      const historicSeries = await this.getSeriesByUserId(userId);

      // 2. Préparer les données pour l'IA
      const historyData = historicSeries.map(s => ({
        weightDone: s.weightDone,
        timeDone: s.timeDone,
        repetitionsDone: s.repetitionsDone,
        dateDone: s.dateDone
      }));

      // 3. Créer le prompt
      const prompt = `
Vous êtes un coach sportif intelligent. 
Vous disposez de l'historique des dernières séries réalisées par l'utilisateur (en JSON ci-dessous). 
En vous basant sur ces performances, générez de nouvelles séries adaptées à l'utilisateur.
Retournez UNIQUEMENT un tableau JSON de la forme :
[
  {
    "weightGoal": Number,
    "timeGoal": Number,
    "repetitionsGoal": Number
  },
  ...
]

Aucune autre forme de réponse. Aucun texte supplémentaire. Aucune explication. Uniquement le tableau JSON.
Considérez que le temps est en secondes, le poids en kg, et le nombre de répétitions est un entier.

Voici l'historique JSON :
${JSON.stringify(historyData)}

Générez 3 séries d'exemple, adaptées à l'utilisateur.
`;

      // 4. Appel à l'API GPT
      const gptResponseData = await callGptApi(prompt);

      let recommendedSeries;
      try {
        recommendedSeries = JSON.parse(gptResponseData);
      } catch (parseError) {
        log.error("Failed to parse GPT response", { error: parseError });
        throw new Error("Invalid GPT response format");
      }

      // 5. Créer ces nouvelles séries en base
      let now;
      const createdSeries = [];
      for (const serieObj of recommendedSeries) {
        now = new Date();
        const newSerie = await this.createSerie({
          userId: userId,
          weightGoal: serieObj.weightGoal || 0,
          timeGoal: serieObj.timeGoal || 0,
          repetitionsGoal: serieObj.repetitionsGoal || 0,
          weightDone: 0,
          timeDone: 0,
          repetitionsDone: 0,
          dateCreation: now
        });
        createdSeries.push(newSerie);
      }

      return createdSeries;
      
    } catch (error) {
      log.error("Failed to generate series by AI", { error });
      throw error;
    }
  }
}

module.exports = new SerieService();
