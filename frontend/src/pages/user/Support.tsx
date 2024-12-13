import Footer from "./Footer";
import Banner from "../../components/Banner";
import { useEffect, useState } from "react";
import axios from "axios";

interface Dumbbell {
  _id: string;
  name: string;
}

const ReportDumbbellPage = () => {
  const [dumbbells, setDumbbells] = useState<Dumbbell[]>([]);
  const [motif, setMotif] = useState<string>("");
  const [selectedDumbbell, setSelectedDumbbell] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const fetchDumbbells = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/dumbbell`);
        setDumbbells(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des haltères :", error);
      }
    };

    fetchDumbbells();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log({ motif, selectedDumbbell, comments });
    // Simuler une soumission réussie
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Banner subtitle="Signaler un haltère" redirectPath="/support" />

      <img className="h-48 Image7 w-96" src="/photo.jpg" alt="Salle de sport" />
      <form className="pb-32 mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="motif" className="block mb-2 text-gray-700">
            Motif
          </label>
          <select
            id="motif"
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 border rounded"
          >
            <option value="" disabled>
              Sélectionnez un motif
            </option>
            <option value="Problème de connexion">Problème de connexion</option>
            <option value="Problème de batterie">Problème de batterie</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div>
          <label htmlFor="dumbbell" className="block mb-2 text-gray-700">
            Haltère
          </label>
          <select
            id="dumbbell"
            value={selectedDumbbell}
            onChange={(e) => setSelectedDumbbell(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 border rounded"
          >
            <option value="" disabled>
              Sélectionnez un haltère
            </option>
            {dumbbells.map((dumbbell) => (
              <option key={dumbbell._id} value={dumbbell._id}>
                {dumbbell.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="comments" className="block mb-2 text-gray-700">
            Commentaires
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 bg-gray-100 border rounded"
            placeholder="Entrez vos commentaires ici"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white rounded bg-zinc-500"
        >
          Envoyer
        </button>

        {isSubmitted && (
          <div className="mt-4 text-green-600">
            Votre demande a bien été prise en compte !
          </div>
        )}
      </form>

      <Footer />
    </div>
  );
};

export default ReportDumbbellPage;
