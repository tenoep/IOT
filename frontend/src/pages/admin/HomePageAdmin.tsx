import { useNavigate } from "react-router-dom";
import Banner from "../../components/Banner";

const HomePageManager = () => {
  const navigate = useNavigate();

  // TODO
  const users = () => {
    navigate("/admin/user");
  };

  const dumbbells = () => {
    navigate("/admin/dumbbell");
  };

  return (
    <div>
      <Banner subtitle="Page d'accueil du gérant" redirectPath="/manager" />
      <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
        <div className="mt-5 bg-white w-[555px] h-[568px] rounded-[10px] shadow-lg p-6 flex flex-col items-center">
          <div className="mb-2 text-2xl font-semibold text-black">
            Page d’accueil de l'admin
          </div>
          <div className="mb-8 text-lg font-light text-gray-600">IMPACT</div>
          <button
            className="w-[458px] h-12 bg-white text-black text-xl font-medium border border-black rounded-[10px] mb-4"
            onClick={users}
          >
            Gestion des utilisateurs
          </button>
          <button
            className="w-[458px] h-12 bg-white text-black text-xl font-medium border border-black rounded-[10px] mb-4"
            onClick={dumbbells}
          >
            Gestion des haltères
          </button>
        </div>
      </div>

      {/* <div className="max-w-2xl p-20 mx-auto bg-white rounded-lg shadow-md">
        <h1 className="mb-2 text-4xl font-semibold text-center">
          Page d'accueil du gérant
        </h1>
        <h3 className="mb-6 text-xl font-light text-center text-gray-500">
          Impact
        </h3>
        <ul className="space-y-4">
          <li>
            <button
              className="w-full px-4 py-2 text-black bg-white border border-black rounded hover:bg-gray-100"
              onClick={listDumbell}
            >
              Liste des haltères
            </button>
          </li>
          <li>
            <button
              className="w-full px-4 py-2 text-black bg-white border border-black rounded hover:bg-gray-100"
              onClick={dashboardDumbell}
            >
              Tableau de bord des haltères
            </button>
          </li>
          <li>
            <button
              className="w-full px-4 py-2 text-black bg-white border border-black rounded hover:bg-gray-100"
              onClick={support}
            >
              Contacter le support
            </button>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default HomePageManager;
