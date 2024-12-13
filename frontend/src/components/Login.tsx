import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  login: string;
  password: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({ login: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const register = () => {
    navigate("/register");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/user/login`,
        form
      );

      const { role, _id, login } = response.data;
      sessionStorage.setItem("userId", _id);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("login", login);

      // Redirection en fonction du rôle "admin", "user", "manager"
      switch (role) {
        case "admin":
          navigate("/admin");
          break;
        case "user":
          navigate("/client");
          break;
        case "manager":
          navigate("/manager");
          break;
        case "userNotFound":
          setError("Identifiants Incorrects");
          break;
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la connexion");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="Rectangle49 w-[400px] h-[500px] bg-white rounded-[10px] p-6 flex flex-col items-center shadow-md">
        <div className="SeConnecter text-black text-[25px] font-bold mb-12">
          Se connecter
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full mb-6">
            <label className="Login block text-black text-xl font-normal font-['Inter'] mb-2">
              Login
            </label>
            <input
              type="text"
              name="login"
              value={form.login}
              onChange={handleChange}
              required
              className="Rectangle50 w-full h-[53px] bg-white rounded-[10px] px-4 text-sm text-[#555555] border border-gray-300"
              placeholder="Entrez votre login"
            />
          </div>
          <div className="w-full mb-6">
            <label className="MotDePasse block text-black text-xl font-normal font-['Inter'] mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Entrez votre mot de passe"
              className="Rectangle51 w-full h-[53px] bg-white rounded-[10px] px-4 text-sm text-[#555555] border border-gray-300"
            />
          </div>
          <div className="flex justify-center w-full mb-6">
            <button
              type="submit"
              className="Rectangle52 w-[205px] h-[53px] bg-black rounded-[10px] text-white text-xl font-normal font-['Inter'] mt-6"
            >
              Se connecter
            </button>
          </div>
        </form>

        <button
          onClick={register}
          className="CrErUnCompte mt-10 text-black text-sm font-normal font-['Inter'] underline cursor-pointer"
        >
          Créer un compte
        </button>
        {error && (
          <p className="mt-4 text-sm text-center text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Login;

/* <div className="w-2/3 max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Se connecter
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Login:
            </label>
            <input
              type="text"
              name="login"
              value={form.login}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Entrez votre login"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Se connecter
          </button>
        </form>
        <button
            className="w-full py-3 italic hover:underline"
            onClick={register}
        >
          Créer un compte
        </button>
        {error && (
          <p className="mt-4 text-sm text-center text-red-500">{error}</p>
        )}
      </div> */
