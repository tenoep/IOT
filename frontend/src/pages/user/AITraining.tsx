import { useState } from "react";
import Footer from "./Footer";
import Banner from "../../components/Banner";
import axios from "axios";

const GenerateSeriesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [seriesList, setSeriesList] = useState([]);

  const generateSeries = async () => {
    setIsLoading(true);
    setResponseMessage("");
    setSeriesList([]);

    try {
      const userId = sessionStorage.getItem("userId");
      const response = await axios.post(
        `${process.env.BACKEND_URL}/serie/recommend/${userId}`
      );
      setResponseMessage("Séries générées avec succès !");
      setSeriesList(response.data);
      console.log("Réponse du serveur :", response.data);
    } catch (error) {
      console.error("Erreur lors de la génération des séries :", error);
      setResponseMessage("Erreur lors de la génération des séries.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Banner subtitle="Générer des séries IA" redirectPath="/support" />
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-8 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Générer des séries par IA
        </h1>

        <button
          onClick={generateSeries}
          className={`px-4 py-2 text-white rounded ${
            isLoading ? "bg-gray-400" : "bg-black hover:bg-black"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Génération en cours..." : "Générer les séries"}
        </button>

        {responseMessage && (
          <p className="mt-4 text-lg text-gray-600">{responseMessage}</p>
        )}

        {seriesList.length > 0 && (
          <div className="mt-6 pb-20">
            <h2 className="text-xl font-semibold text-gray-700">Séries générées :</h2>
            <ul className="mt-4 space-y-2">
              {seriesList.map((serie) => (
                <li
                  key={serie._id}
                  className="p-4 bg-white shadow rounded-lg border border-gray-200"
                >
                  <p><strong>Poids objectif :</strong> {serie.weightGoal} kg</p>
                  <p><strong>Temps objectif :</strong> {serie.timeGoal} s</p>
                  <p><strong>Répétitions objectif :</strong> {serie.repetitionsGoal}</p>
                  {/* <p><strong>Date de création :</strong> {new Date(serie.dateCreation).toLocaleString()}</p> */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GenerateSeriesPage;
