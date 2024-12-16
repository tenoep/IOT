import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

interface UserForm {
  login: string;
  password: string;
  email: string;
}

interface User {
  _id: string;
  login: string;
  password: string;
  email: string;
  role: string;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<UserForm>({
    login: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  useEffect(() => {
    setForm({ login: "", password: "", email: "" });
    setError(null);
    setSuccess(null);
  }, []);

  const { param } = useParams();

  const navigate = useNavigate();

  const login = () => {
    if (param) {
      navigate(`/id/${param}`);
    } else {
      navigate("/");
    }
  };

  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      await axios.post(`${process.env.BACKEND_URL}/user`, form);
      setSuccess("Utilisateur créé avec succès ! Redirection...");
      setForm({ login: "", password: "", email: "" });
      await timeout(2000);
      login();
    } catch (err: any) {
      console.log(err.response?.data?.error);
      setError("Erreur lors de la création de l'utilisateur");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="Rectangle49 w-[400px] h-auto bg-white rounded-[10px] p-6 flex flex-col items-center shadow-md">
        <div className="CrErUnCompte text-black text-[25px] font-bold mb-12">
          Créer un compte
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="w-full mb-6">
            <label className="block text-black text-xl font-normal font-['Inter'] mb-2">
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
            <label className="block text-black text-xl font-normal font-['Inter'] mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="Rectangle51 w-full h-[53px] bg-white rounded-[10px] px-4 text-sm text-[#555555] border border-gray-300"
              placeholder="Entrez votre email"
            />
          </div>

          {/* Password Field */}
          <div className="w-full mb-6">
            <label className="block text-black text-xl font-normal font-['Inter'] mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="Rectangle52 w-full h-[53px] bg-white rounded-[10px] px-4 text-sm text-[#555555] border border-gray-300"
              placeholder="Entrez votre mot de passe"
            />
          </div>

          {/* Register Button */}
          <div className="flex justify-center w-full mb-6">
            <button
              type="submit"
              className="Rectangle53 w-[205px] h-[53px] bg-black rounded-[10px] text-white text-xl font-normal font-['Inter']"
              onClick={handleSubmit}
            >
              Créer un compte
            </button>
          </div>
        </form>
        {error && (
          <p className="mt-4 text-sm text-center text-red-500">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-sm text-center text-green-500">{success}</p>
        )}
        <button
          className="CrErUnCompte mt-10 text-black text-sm font-normal font-['Inter'] underline cursor-pointer"
          onClick={login}
        >
          Vous avez deja un compte ? Se connecter
        </button>
      </div>

      {/* <div className="w-2/3 max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Créer un compte</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Login:</label>
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
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              placeholder="Entrez votre login"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
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
            Créer un compte
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-center text-red-500">{error}</p>}
        {success && <p className="mt-4 text-sm text-center text-green-500">{success}</p>}
        <button
          className='w-full py-3 italic hover:underline'
          onClick={login}
        >
          Vous avez deja un compte ? Se connecter
        </button>
      </div> */}
    </div>
  );
};

export default Register;
