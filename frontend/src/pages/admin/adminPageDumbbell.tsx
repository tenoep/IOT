import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Banner from "../../components/Banner";

export interface Dumbbell {
  _id?: string;
  name: string;
  chargeBattery: string | number;
  currentWeight: string | number;
}

const DumbbellList = () => {
  const [dumbbells, setDumbbells] = useState<Dumbbell[]>([]);
  const [formData, setFormData] = useState<Dumbbell>({
    name: "",
    chargeBattery: "",
    currentWeight: "",
  });
  const [editingDumbbellId, setEditingDumbbellId] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetchDumbbells();
  }, []);

  const fetchDumbbells = async () => {
    try {
      const response = await axios.get(`${process.env.BACKEND_URL}/dumbbell`);
      setDumbbells(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des haltères :", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingDumbbellId) {
        await axios.put(
          `${process.env.BACKEND_URL}/dumbbell/${editingDumbbellId}`,
          formData
        );
      } else {
        await axios.post(`${process.env.BACKEND_URL}/dumbbell`, formData);
      }
      resetForm();
      fetchDumbbells();
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout ou la mise à jour de l'haltère :",
        error
      );
    }
  };

  const handleEdit = (dumbbell: Dumbbell) => {
    setFormData({
      name: dumbbell.name,
      chargeBattery: dumbbell.chargeBattery,
      currentWeight: dumbbell.currentWeight,
    });
    setEditingDumbbellId(dumbbell._id || null);
  };

  const handleDelete = async (dumbbellId: string) => {
    try {
      await axios.delete(`${process.env.BACKEND_URL}/dumbbell/${dumbbellId}`);
      fetchDumbbells();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'haltère :", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      chargeBattery: 100,
      currentWeight: 10,
    });
    setEditingDumbbellId(null);
  };

  return (
    <div>
      <Banner subtitle="Gestion des haltères" redirectPath="/" />
      <div className="min-h-screen p-4 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 text-white rounded bg-zinc-700 hover:bg-zinc-600"
          >
            Retour
          </button>
          <h1 className="mx-auto text-2xl font-bold">Liste des haltères</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 mb-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="mb-4 text-lg font-semibold">
            Ajouter ou modifier un haltère
          </h2>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nom de l'haltère"
            required
            className="w-full px-4 py-2 mb-2 border rounded"
          />
          <input
            type="number"
            name="chargeBattery"
            value={formData.chargeBattery}
            onChange={handleChange}
            placeholder="Charge de la batterie (%)"
            required
            className="w-full px-4 py-2 mb-2 border rounded"
          />
          <input
            type="number"
            name="currentWeight"
            value={formData.currentWeight}
            onChange={handleChange}
            placeholder="Poids actuel (kg)"
            required
            className="w-full px-4 py-2 mb-2 border rounded"
          />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 mt-2 text-white bg-black rounded hover:bg-gray-800"
            >
              {editingDumbbellId ? "Mettre à jour" : "Ajouter"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 mt-2 text-white bg-gray-500 rounded hover:bg-gray-400"
            >
              Abandon
            </button>
          </div>
        </form>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dumbbells.map((dumbbell) => (
            <div
              key={dumbbell._id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {dumbbell.name}
              </h2>
              <p className="mt-2 text-gray-600">
                <strong>Charge de la batterie :</strong>{" "}
                {dumbbell.chargeBattery}%
              </p>
              <p className="mt-2 text-gray-600">
                <strong>Poids actuel :</strong> {dumbbell.currentWeight} kg
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(dumbbell)}
                  className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-400"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(dumbbell._id!)}
                  className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-400"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DumbbellList;
