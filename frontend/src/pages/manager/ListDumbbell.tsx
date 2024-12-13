import { useEffect, useState } from "react";
import axios from "axios";
import iconDumbbell from "../../../public/iconDumbell.png"; // Chemin vers l'image
import Banner from "../../components/Banner";

export interface User {
  _id: string;
  email: string;
  login: string;
  password: string;
  role: "user" | "manager" | "admin";
  // Ajoute d'autres champs si nécessaire
}

export interface Dumbbell {
  _id: string;
  name: string;
  state: "on" | "off" | "charging" | "broken";
  chargeBattery: number;
  userId?: User | null; // Peut être un objet User ou null s'il n'y a pas d'utilisateur associé
  currentWeight: number;
}

const DumbbellList = () => {
  const [dumbbells, setDumbbells] = useState<Dumbbell[]>([]);

  useEffect(() => {
    const fetchDumbbells = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/dumbbell`);
        setDumbbells(response.data);
        console.log("Haltères récupérés :", response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des haltères :", error);
      }
    };

    fetchDumbbells();
  }, []);

  // Fonction pour déterminer la couleur de la pastille en fonction de l'état
  const getStateDotColor = (state: string) => {
    switch (state) {
      case "on":
        return "bg-green-500";
      case "off":
        return "bg-gray-500";
      case "charging":
        return "bg-orange-400";
      case "broken":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  const getBatteryColor = (chargeBattery: number) => {
    if (chargeBattery > 60) {
      return "text-green-500";
    } else if (chargeBattery > 20) {
      return "text-orange-400";
    } else {
      return "text-red-500";
    }
  };

  return (
    <div>
      <Banner subtitle="Liste des haltères" redirectPath="/manager" />
      <div className="min-h-screen p-4 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 text-white rounded bg-zinc-700 hover:bg-zinc-600"
          >
            Retour
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dumbbells.map((dumbbell: Dumbbell) => (
            <div
              key={dumbbell._id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <div className="flex items-center">
                <img
                  src={iconDumbbell}
                  alt="Dumbbell icon"
                  className="w-6 h-6 mr-2"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {dumbbell.name}
                </h2>
              </div>
              <div className="flex items-center mt-2">
                <span
                  className={`w-3 h-3 rounded-full mr-2 ${getStateDotColor(
                    dumbbell.state
                  )}`}
                />
                <p className="text-gray-600">
                  <strong>État :</strong>{" "}
                  <span className="capitalize">{dumbbell.state}</span>
                </p>
              </div>
              <p className="mt-2 text-gray-600">
                <strong>Charge de la batterie :</strong>{" "}
                <span className={`${getBatteryColor(dumbbell.chargeBattery)}`}>
                  {dumbbell.chargeBattery}%
                </span>
              </p>
              <p className="mt-2 text-gray-600">
                <strong>Poids actuel :</strong> {dumbbell.currentWeight} kg
              </p>
              {dumbbell.userId && (
                <p className="mt-2 text-gray-600">
                  <strong>Assigné à l'utilisateur :</strong>{" "}
                  {dumbbell.userId.login}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DumbbellList;
