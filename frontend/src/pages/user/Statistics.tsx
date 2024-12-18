import { useEffect, useState } from "react";
import Footer from "./Footer";
import Banner from "../../components/Banner";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";

const StatisticsPage = () => {
  const [view, setView] = useState("day"); // Vue actuelle : jour, semaine, mois
  // const [sessionData, setSessionData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const id = sessionStorage.getItem("userId");
    if (id) {
      setUserId(id);
    } else {
      console.error("userId not found in sessionStorage");
    }
  }, []);

  useEffect(() => {
    const fetchStatistics = async () => {
      if (!userId) return; // Arrêter si userId est null
      try {
        const response = await axios.get(
          `${process.env.BACKEND_URL}/serie/user/${userId}`
        );
        setSeriesData(response.data);
      } catch (error) {
        console.error("Error fetching statistics data:", error);
      }
    };

    fetchStatistics();
  }, [userId]);

  if (!userId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Chargement des données...</p>
      </div>
    );
  }

  // Filtrage des données par date en fonction de la vue sélectionnée
  const filterByDate = (data, dateField) => {
    const now = new Date();

    return data.filter((item) => {
      const itemDate = new Date(item[dateField]);

      if (view === "day") {
        return itemDate.toDateString() === now.toDateString();
      } else if (view === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return itemDate >= weekAgo && itemDate <= now;
      } else if (view === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        return itemDate >= monthAgo && itemDate <= now;
      }
      return true;
    });
  };

  // const filteredSessions = filterByDate(sessionData, "date");
  const filteredSeries = filterByDate(seriesData, "dateDone");

  // const sessionEfficiencyData = {
  //   labels: ["FABULEUX", "BIEN", "OK"],
  //   datasets: [
  //     {
  //       label: "Session Efficiency",
  //       data: [
  //         filteredSessions.filter((s) => s.efficiency === "FABULEUX").length,
  //         filteredSessions.filter((s) => s.efficiency === "BIEN").length,
  //         filteredSessions.filter((s) => s.efficiency === "OK").length,
  //       ],
  //       backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
  //     },
  //   ],
  // };

  const seriesWeightData = {
    labels: filteredSeries.map((serie) =>
      new Date(serie.dateDone).toLocaleDateString("fr-FR")
    ),
    datasets: [
      {
        label: "Poids réalisé (kg)",
        data: filteredSeries.map((serie) => serie.weightDone),
        backgroundColor: "#2196f3",
        borderColor: "#1976d2",
        borderWidth: 1,
      },
      {
        label: "Poids proposé (kg)",
        data: filteredSeries.map((serie) => serie.weightGoal),
        backgroundColor: "#ff5722",
        borderColor: "#e64a19",
        borderWidth: 1,
      },
    ],
  };

  const seriesTimeData = {
    labels: filteredSeries.map((serie) =>
      new Date(serie.dateDone).toLocaleDateString("fr-FR")
    ),
    datasets: [
      {
        label: "Temps réalisé (s)",
        data: filteredSeries.map((serie) => serie.timeDone),
        backgroundColor: "#673ab7",
        borderColor: "#512da8",
        borderWidth: 1,
      },
      {
        label: "Temps proposé (s)",
        data: filteredSeries.map((serie) => serie.timeGoal),
        backgroundColor: "#ff9800",
        borderColor: "#f57c00",
        borderWidth: 1,
      },
    ],
  };

  const seriesRepsData = {
    labels: filteredSeries.map((serie) =>
      new Date(serie.dateDone).toLocaleDateString("fr-FR")
    ),
    datasets: [
      {
        label: "Nombre de répétitions réalisées",
        data: filteredSeries.map((serie) => serie.repetitionsDone),
        backgroundColor: "#4caf50",
        borderColor: "#388e3c",
        borderWidth: 1,
      },
      {
        label: "Nombre de répétitions proposées",
        data: filteredSeries.map((serie) => serie.repetitionsGoal),
        backgroundColor: "#e91e63",
        borderColor: "#c2185b",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen overflow-auto bg-gray-50">
      <Banner subtitle="Voir mes statistiques" redirectPath="/support" />
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-8 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">Statistiques</h1>

        {/* Boutons de sélection de vue */}
        <div className="flex justify-center mb-4 space-x-2">
          <button
            onClick={() => setView("day")}
            className={`px-2 py-1 rounded ${
              view === "day" ? "bg-black text-white" : "bg-gray-200 text-black"
            }`}
          >
            Jour
          </button>
          <button
            onClick={() => setView("week")}
            className={`px-4 py-2 rounded ${
              view === "week" ? "bg-black text-white" : "bg-gray-200 text-black"
            }`}
          >
            Semaine
          </button>
          <button
            onClick={() => setView("month")}
            className={`px-4 py-2 rounded ${
              view === "month"
                ? "bg-black text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Mois
          </button>
        </div>

        {/* Line Chart for Series Weight */}
        <div className="w-full max-w-2xl">
          <h2 className="mb-4 text-lg font-semibold text-gray-600">
            Poids réalisé par série
          </h2>
          <Line data={seriesWeightData} />
        </div>

        {/* Line Chart for Series Time */}
        <div className="w-full max-w-2xl">
          <h2 className="mb-4 text-lg font-semibold text-gray-600">
            Temps réalisé par série
          </h2>
          <Line data={seriesTimeData} />
        </div>

        {/* Line Chart for Series Reps */}
        <div className="w-full max-w-2xl mb-20">
          <h2 className="mb-4 text-lg font-semibold text-gray-600">
            Répétitions réalisées par série
          </h2>
          <Line
            data={seriesRepsData}
            style={{
              marginBottom: "100px",
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StatisticsPage;
