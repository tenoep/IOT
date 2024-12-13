import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Banner from "../../components/Banner"; // Assure-toi que le chemin vers Banner est correct

export interface User {
  _id?: string;
  email: string;
  login: string;
  password: string;
  role: "user" | "manager" | "admin";
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<User>({
    email: "",
    login: "",
    password: "",
    role: "user",
  });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.BACKEND_URL}/user`);
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await axios.put(
          `${process.env.BACKEND_URL}/user/${editingUserId}`,
          formData
        );
      } else {
        await axios.post(`${process.env.BACKEND_URL}/user`, formData);
      }
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout ou la mise à jour de l'utilisateur :",
        error
      );
    }
  };

  const handleEdit = (user: User) => {
    setFormData({
      email: user.email,
      login: user.login,
      password: "",
      role: user.role,
    });
    setEditingUserId(user._id || null);
  };

  const handleDelete = async (userId: string) => {
    try {
      await axios.delete(`${process.env.BACKEND_URL}/user/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  const resetForm = () => {
    setFormData({ email: "", login: "", password: "", role: "user" });
    setEditingUserId(null);
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "text-red-500";
      case "manager":
        return "text-blue-500";
      case "user":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div>
      <Banner subtitle="Gestion des utilisateurs" redirectPath="/" />
      <div className="min-h-screen p-4 bg-gray-100">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 text-white rounded bg-zinc-700 hover:bg-zinc-600"
          >
            Retour
          </button>
          <h1 className="mx-auto text-2xl font-bold">Liste des utilisateurs</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 mb-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="mb-4 text-lg font-semibold">
            Ajouter ou modifier un utilisateur
          </h2>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            placeholder="Login"
            required
            className="w-full px-4 py-2 mb-2 border rounded"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            required={!editingUserId}
            className="w-full px-4 py-2 mb-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 mb-2 border rounded"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-2 border rounded"
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 mt-2 text-white bg-black rounded hover:bg-gray-800"
            >
              {editingUserId ? "Mettre à jour" : "Ajouter"}
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
          {users.map((user) => (
            <div
              key={user._id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {user.login}
              </h2>
              <p className="mt-2 text-gray-600">
                <strong>Email :</strong> {user.email}
              </p>
              <p className="mt-2 text-gray-600">
                <strong>Rôle :</strong>{" "}
                <span className={`${getRoleColor(user.role)}`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(user)}
                  className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-400"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(user._id!)}
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

export default UserList;
