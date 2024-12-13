import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../../components/Banner";

interface Dumbbell {
  _id: string;
  name: string;
}

const SupportPage = () => {
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
    <div>
      <Banner subtitle="Support" redirectPath="/manager" />
      <div className="min-h-screen p-4 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 text-white rounded bg-zinc-700 hover:bg-zinc-600"
          >
            Retour
          </button>
        </div>
        <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
          <div className="flex flex-col w-full max-w-6xl mt-6 space-y-6 lg:flex-row lg:space-x-8 lg:space-y-0">
            <div className="w-full p-6 bg-white rounded-lg shadow-md lg:w-1/2">
              <h2 className="text-2xl font-bold text-gray-800">
                Contacter le support
              </h2>
              <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
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
                    <option value="Problème de connexion">
                      Problème de connexion
                    </option>
                    <option value="Problème de batterie">
                      Problème de batterie
                    </option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="dumbbell"
                    className="block mb-2 text-gray-700"
                  >
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
                  <label
                    htmlFor="comments"
                    className="block mb-2 text-gray-700"
                  >
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
            </div>

            <div className="w-full p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800">FAQ</h2>
              <div className="mt-4 space-y-4">
                <div className="FaqCommentChangerLaBatterieDeLHaltReConnectPourChangerLaBatterieDeLHaltReConnectImpactVeuillezSuivreCesTapesInsRezLeConnecteurDuChargeurDansLaPriseDeChargeDeLAppareilAssurezVousQueLaConnexionEstBienEnPlaceBranchezLeChargeurDansUnePriseMuraleSCurisEEtAllumezSiNCessaireLInterrupteurDeLaPriseVRifiezQueLaPriseFonctionneCorrectementPourViterUneChargeInterrompueAttendreQueLaLedDeChargeSAllumeEnVertPourIndiquerLaChargeComplTeDeLaBatterieLHaltReNeSeConnectePasLApplicationQueDoisJeFaireSiVotreHaltReNeSeConnectePasEssayezLesSolutionsSuivantesAssurezVousQueLeBluetoothEstActivSurVotreAppareilMobileVRifiezQueLHaltReEstChargSiLaBatterieEstFaibleRechargezOuRemplacezLaRedMarrezLApplicationImpactEtTentezDeReconnecterLHaltReCommentSynchroniserLesDonnEsDeLHaltReAvecLApplicationImpactPourSynchroniserLesDonnEsDeVotreHaltReOuvrezLApplicationImpactSurVotreSmartphoneActivezLeBluetoothEtAssurezVousQueLHaltReEstProximitLHaltReSeConnecteraAutomatiquementSiLesDeuxAppareilsSontDJAppairSSinonSLectionnezManuellementLHaltReDansLaListeDesAppareilsDisponiblesDansLApplication">
                  <span
                    style={{
                      color: "black",
                      fontSize: "base",
                      fontWeight: "normal",
                    }}
                  >
                    <h3 className="font-bold">
                      Comment changer la batterie de l'haltère connecté ?<br />
                    </h3>
                  </span>
                  <span
                    style={{
                      color: "black",
                      fontSize: "base",
                      fontWeight: "normal",
                    }}
                  >
                    Pour changer la batterie de l'haltère connecté IMPACT,
                    veuillez suivre ces étapes : Insérez le connecteur du
                    chargeur dans la prise de charge de l’appareil. Assurez-vous
                    que la connexion est bien en place.
                    <br />
                    Branchez le chargeur dans une prise murale sécurisée et
                    allumez, si nécessaire, l'interrupteur de la prise. Vérifiez
                    que la prise fonctionne correctement pour éviter une charge
                    interrompue. <br />
                    Attendre que la LED de charge s'allume en vert pour indiquer
                    la charge complète de la batterie
                    <br />
                  </span>
                  <span
                    style={{
                      color: "black",
                      fontSize: "base",
                      fontWeight: "normal",
                    }}
                  >
                    <h3 className="font-bold">
                      L'haltère ne se connecte pas à l'application, que dois-je
                      faire ?<br />
                    </h3>
                  </span>
                  <span
                    style={{
                      color: "black",
                      fontSize: "base",
                      fontWeight: "normal",
                    }}
                  >
                    Si votre haltère ne se connecte pas, essayez les solutions
                    suivantes : Assurez-vous que le Bluetooth est activé sur
                    votre appareil mobile.
                    <br />
                    Vérifiez que l'haltère est chargé. Si la batterie est
                    faible, rechargez ou remplacez-la. <br />
                    Redémarrez l'application IMPACT et tentez de reconnecter
                    l'haltère.
                    <br />
                  </span>
                  <span
                    style={{
                      color: "black",
                      fontSize: "base",
                      fontWeight: "normal",
                    }}
                  >
                    <h3 className="font-bold">
                      Comment synchroniser les données de l'haltère avec
                      l’application IMPACT ?<br />
                    </h3>
                  </span>
                  <span
                    style={{
                      color: "black",
                      fontSize: "base",
                      fontWeight: "normal",
                    }}
                  >
                    Pour synchroniser les données de votre haltère : Ouvrez
                    l’application IMPACT sur votre smartphone. Activez le
                    Bluetooth et assurez-vous que l'haltère est à proximité.
                    L'haltère se connectera automatiquement si les deux
                    appareils sont déjà appairés. Sinon, sélectionnez
                    manuellement l'haltère dans la liste des appareils
                    disponibles dans l’application.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
