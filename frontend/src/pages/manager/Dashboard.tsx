import { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";
import Banner from "../../components/Banner";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Enregistrement des éléments nécessaires pour les graphiques
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [view, setView] = useState("day"); // Vue actuelle : jour, semaine, mois
  interface Dumbbell {
    name: string;
    state: "on" | "off" | "charging" | "broken";
    chargeBattery: number;
  }

  const [dumbbells, setDumbbells] = useState<Dumbbell[]>([]);
  interface Serie {
    dateDone: string;
    userId: string;
  }

  const [series, setSeries] = useState<Serie[]>([]);

  useEffect(() => {
    const fetchDumbbells = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/dumbbell`);
        setDumbbells(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des haltères :", error);
      }
    };

    const fetchSeries = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/serie`);
        setSeries(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des séries :", error);
      }
    };

    fetchDumbbells();
    fetchSeries();
  }, []);

  // Filtrage des séries par vue (jour, semaine, mois)
  const filteredSeries = series.filter((serie) => {
    const serieDate = new Date(serie.dateDone);
    const now = new Date();

    if (view === "day") {
      return serieDate.toDateString() === now.toDateString();
    } else if (view === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate() - 7);
      return serieDate >= weekAgo && serieDate <= now;
    } else if (view === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(now.getMonth() - 1);
      return serieDate >= monthAgo && serieDate <= now;
    }
    return true;
  });

  const uniqueUsers = new Set(filteredSeries.map((serie) => serie.userId)).size;

  // Données pour le graphique camembert (état des haltères)
  const stateCounts = dumbbells.reduce(
    (acc, dumbbell) => {
      acc[dumbbell.state] += 1;
      return acc;
    },
    { on: 0, off: 0, charging: 0, broken: 0 }
  );

  const pieData = {
    labels: ["On", "Off", "Charging", "Broken"],
    datasets: [
      {
        label: "État des haltères",
        data: [
          stateCounts.on,
          stateCounts.off,
          stateCounts.charging,
          stateCounts.broken,
        ],
        backgroundColor: ["#4CAF50", "#9E9E9E", "#FF9800", "#F44336"],
      },
    ],
  };

  // Données pour le graphique de charge de batterie des haltères avec couleurs conditionnelles
  const batteryData = {
    labels: dumbbells.map((dumbbell) => dumbbell.name),
    datasets: [
      {
        label: "Charge de la batterie (%)",
        data: dumbbells.map((dumbbell) => dumbbell.chargeBattery),
        backgroundColor: dumbbells.map((dumbbell) => {
          if (dumbbell.chargeBattery < 40) return "#F44336"; // Rouge pour charge < 40%
          if (dumbbell.chargeBattery >= 40 && dumbbell.chargeBattery <= 60)
            return "#FF9800"; // Orange pour 40-60%
          return "#4CAF50"; // Vert pour charge > 60%
        }),
      },
    ],
  };

  return (
    <div>
      <Banner subtitle="Dashboard du gérant" redirectPath="/manager" />
      <div className="min-h-screen p-4 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 text-white rounded bg-zinc-700 hover:bg-zinc-600"
          >
            Retour
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
          {/* Graphique camembert de l'état des haltères (plus petit) */}
          <div className="p-4 bg-white border rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              État des haltères
            </h2>
            <div
              className="flex items-center justify-center"
              style={{ height: "300px" }}
            >
              <Pie data={pieData} />
            </div>
          </div>

          {/* Graphique de charge de batterie des haltères (plus bas et avec couleurs) */}
          <div className="p-4 bg-white border rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Charge des haltères
            </h2>
            <div
              className="flex items-center justify-center"
              style={{ height: "300px" }}
            >
              <Bar data={batteryData} />
            </div>
          </div>

          {/* Nombre de clients uniques filtrés par vue */}
          <div className="p-4 bg-white border rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Nombre de clients
            </h2>
            <div className="flex justify-end mb-2 space-x-2">
              <button
                onClick={() => setView("day")}
                className={`px-2 py-1 text-xs font-semibold ${
                  view === "day"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                } rounded`}
              >
                Jour
              </button>
              <button
                onClick={() => setView("week")}
                className={`px-2 py-1 text-xs font-semibold ${
                  view === "week"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                } rounded`}
              >
                Semaine
              </button>
              <button
                onClick={() => setView("month")}
                className={`px-2 py-1 text-xs font-semibold ${
                  view === "month"
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                } rounded`}
              >
                Mois
              </button>
            </div>
            <div className="mt-6 text-center">
              <p className="mt-16 text-lg text-gray-800">
                Nombre de clients{" "}
                {view === "day"
                  ? "aujourd'hui"
                  : view === "week"
                  ? "cette semaine"
                  : "ce mois-ci"}{" "}
                :
              </p>
              <p className="mt-6 text-6xl font-bold text-black">
                {uniqueUsers}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
